This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Clerk.js Authentication

In this project, we're using clerk.js which is really great for authentication and user managem
But there is a problem here, which I want to have the user's information on my own database which for that we need to use `webhook`

**What is Webhook?**

This basically means, once someone interacts with clerks API throug sign-up sign-in whatever they will then take a URL that I gave them to request that URL to inform someone has done somthing and then I can sync my database.

The problem with that, that is asynchronous. There's no way for me to wait for webhook, at least no elegant way. If I'm waiting for them to talk to my server that's a lot different for me to fire off a request and getting a response back.

Example: Webhook is essentially it's like an event, let's talk about 2 servers, let's talk about Github and your server. So, if you create a webhook on Github, and let's say you wanna subscribe to pull request comment events, so what would happen is, you would give a url to github of your API, and you say hey Github I wanna subscribe to pull request of comment event. And Github says ok cool, whenever someone makes a comment event of pull request, I'm going to issue the request to the URL you gave me. And then that way you can respond to that. You can take that information and use it. Like, slack bot that shows slack messages every time someone sends a pull request. So, your server gets notified by github that someone made a comment event of pull request.

## Database

1. `planetscale`

We're going to use a few things for our database, the first thing we're going to use is `PlanetScale`

**planetscale: is `Serverless SQL database`**

But it's actually somelike cool how it works, and also it's treated like a repo, it makes branches on your database, and it handles migrations for you automatically, it determines what changes to your schema will cause a conflict and write those migrations for you.

2. `prisma`

Prisma is `ORM`, ORM is an SDK for your database, it's how you interact with your database in your code. The sweet thing about prisma is that it doesn't care about the database you use.

## AI

In our project, we're going to send a prmpt to GPT and based on that prompt, I want to get back the result of `Analysis` which returns to me the `mood` `summary` `color` `negative` from the AI.

**Couple of things we need to consider**

1. How to ask it that?
2. We're gonna make sure that, it's consistent. Because, that's the thing about the AI, I mean I can get different and random responses with giving the same prompt.

So, how to get structured output from something that is completely random. What do we have to ask it to get it? And how do we keep all that working?

First ask the right question.

```js
await analyze(
  `I'm going to give you a journal entry, I want to analyze for a few things.I need the mood, a summary, what the subject is, and a color representing the mood and is the mood negative or not with boolean value. You need to respond back with a formatted JSON like so: { "mood": "", "summary": "", "subject": "", "color": "", "negative": false | true }`
);
```

Now the second issue that we're going to solve is the data types that are coming back to me. For example the "negative" I want it to be `boolean` type.

To solve this issue, we will use a library called `Zod`

**Structered Output with Zod**

Now, we want the JSON response to keep it persistent and parse it, extract it and add it to our database.

We're gonna use some javascript schema library to create the schema for us and it creates this prompt for us. So we don't have to create it. We just write code, that code will generate this prompt with the schema embedded to it. And we'll get it back every single time, And we'll just get back a javascript object.

What we can do with `zod` is that we can define a schema and according to that schema we can validate any object that we want.

example:

```js
import { z } from "zod";

const user = {
  name: "John",
  age: 36,
  email: "john@example.com",
};

const UserSchema = z.object({
  name: z.string(), // or z.literal('John')
  age: z.number(),
  email: z.string().email(),
});

const validatedUser = UserSchema.parse(user);
```

`parse` tries to parse the schema and if it is valid it will return parsed object otherwise it will fail.

Now let's get back to our project example

```js
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";

// we can use zod to define a schema for the output using the `fromZodSchema`
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry"),
    summary: z.string().describe("quick summary of the entire entry"),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    subject: z.string().describe("the subject of the journal entry."),
    color: z
      .string()
      .describe(
        "a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
  })
);
```
