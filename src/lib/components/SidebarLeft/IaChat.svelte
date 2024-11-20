<script lang="ts">
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { locations, isFocused } from "../../../stores/stores";
  import type { Message, Museum } from "../../../types/types";

  const API_KEY = "AIzaSyBPBfnQLr18GOxxQyJ-zTMUfO8Osjr2v7c";
  const genAI = new GoogleGenerativeAI(API_KEY);

  let userMessage = "";
  let messages: Message[] = [];
  let isLoading = false;
  let chatContainer: HTMLDivElement;

  // Historial de chat en el formato adecuado para enviar al modelo
  let history = [];

  // Función para scroll automático
  const scrollToBottom = () => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  $: if (messages) {
    setTimeout(scrollToBottom, 0);
  }

  function findRelevantMuseumInfo(query: string): Museum[] {
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(" ");
    //@ts-ignore
    return get(locations).filter((museum) => {
      const title = museum.title?.toLowerCase();
      const category = museum.category.toLowerCase();
      const tags = museum.tags.map((tag) => tag.toLowerCase());

      return keywords.some(
        (keyword) =>
          title.includes(keyword) ||
          category.includes(keyword) ||
          tags.includes(keyword)
      );
    });
  }

  function generatePrompt(
    userQuery: string,
    relevantMuseums: Museum[]
  ): string {
    if (relevantMuseums.length === 0) return userQuery;
    const museumInfo = relevantMuseums
      .map(
        (museum) => `
        Museo: ${museum.title}
        Horario: ${museum.schedule}
        Categoría: ${museum.category}
        Entrada General: $${museum.generalAdmission}
        Estudiantes y Maestros: $${museum.studentsAndTeachers}
        Menores: ${museum.minors || "No especificado"}
        Calificación: ${museum.stars} estrellas (${museum.reviews} reseñas)
        Dirección: ${museum.address}
        Descripción: ${museum.description}
        Transporte:
        Bus: ${museum.bus}
        Metro: ${museum.metro}
        Car: ${museum.car}
        Lugares cercanos: ${museum.nearbyLandmarks?.join(", ")}
        Exhibiciones: ${museum.exhibits?.join(", ")}
        Facilidades: ${museum.facilities?.join(", ")}
    `
      )
      .join("\n\n");

    return `
      Eres un asistente virtual con datos de museos en México. No sugieras consultar otros sitios ni menciones que no tienes acceso a información actualizada.
      
      Información de museos:
      ${museumInfo}
      
      Pregunta del usuario: ${userQuery}
      
    `;
  }

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    isLoading = true;
    const currentMessage = userMessage;
    userMessage = ""; // Limpiar input inmediatamente

    messages = [...messages, { content: currentMessage, isUser: true }];
    history.push({
      role: "user",
      parts: [{ text: currentMessage }],
    });

    try {
      const relevantMuseums = findRelevantMuseumInfo(currentMessage);
      const prompt = generatePrompt(currentMessage, relevantMuseums);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
        history,
      });

      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();

      messages = [...messages, { content: response, isUser: false }];
      history.push({
        role: "model",
        parts: [{ text: response }],
      });
    } catch (error) {
      console.error("Error:", error);
      messages = [
        ...messages,
        {
          content:
            "Lo siento, hubo un error al procesar tu pregunta. ¿Podrías intentarlo de nuevo?",
          isUser: false,
        },
      ];
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    messages = [
      {
        content:
          "Hello! You can ask me about museums in Mexico. For example, about opening hours, prices or general information.",
        isUser: false,
      },
    ];
  });
</script>

<div class="bg-white">
  <div class="space-y-4">
    <div class="flex space-x-2 place-items-center justify-center p-4">
      <img class="h-4 w-4" src="robot-line-icon.svg" alt="" />
      <h1 class="text-2xl font-semibold leading-none tracking-tight">
        Museum AI Assistant
      </h1>
    </div>
<!-- 
    <div class="border bg-[#f4f4f5] flex space-x-2 p-1 rounded-md">
      <button class="bg-white py-2 w-full font-semibold text-sm"
        >Assistant Chat</button
      >
      <button class="py-2 w-full font-semibold text-sm">Tour routes</button>
    </div> -->
  </div>

  <!-- Chat container con scroll -->
  <div class="scrollbar-thumb-gray-800 scrollbar-track-gray-200 ">
    <div
      bind:this={chatContainer}
      class="relative h-[calc(100vh-125px)] overflow-y-auto py-4 space-y-4 scroll-smooth scrollbar-thin p-4"
    >
      <div class="flex flex-col space-y-4">
        {#each messages as message}
          <div class="flex {message.isUser ? 'justify-end' : 'justify-start'}">
            <div
              class="{message.isUser
                ? 'bg-black text-white'
                : 'bg-[#f4f4f5]'} p-3 rounded-lg max-w-[80%]"
            >
              {message.content}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex justify-start">
            <div class="bg-[#f4f4f5] p-3 rounded-lg">Writing...</div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="flex space-x-2 bottom-0 fixed w-[420px] p-4 bg-white">
    <input
      class="w-full rounded-md border py-2 px-4"
      type="text"
      placeholder="Ask about the museum or request a tour."
      bind:value={userMessage}
      on:keydown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
      on:focus={() => isFocused.set(true)}
    />
    <button
      on:click={sendMessage}
      class="bg-black py-2 rounded-md p-1"
      disabled={isLoading}
    >
      <img class="w-10 h-6" src="send-diagonal.svg" alt="" />
    </button>
  </div>
</div>
