// it's actually very easy to use openAI api in your application

// 1. First you need to buy the api from GPT
// 2. $. yarn add langchain
// 3. Then copy and paste the API key into you .env file with the name of OPENAI_API_KEY
// 4. Then once you have your API key, compe to this file and write this api function

// import { OpenAI } from "langchain/llms/openai";

// export const analyze = async (prompt: string): string => {
//   const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
//   const result = await model.call(prompt);
//   return result;
// };

// And then call this api

// const result = await analyze('Create a react component with counter state');

// That's it!
