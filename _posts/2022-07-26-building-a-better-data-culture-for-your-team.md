---
title: "Building a better data culture for your team"
summary: "What are the best ways to build a data-centric culture within an organization? TJ Muehleman and Krishnan Raghupathi are sharing their experience and advice on how to get started."
date: 2022-07-26 00:10:18
last_updated_at: 2022-07-26 00:10:18
categories: "Analytics and BI"
featured_image: /images/posts/webinar-data-culture.jpg
image: /images/posts/webinar-data-culture.jpg
author: The Metabase Team
redirect_from: /blog/building-a-better-data-culture-for-your-team
layout: post
---

<div class="learn-toc" markdown="1">
- [Why data culture is important](#why-data-culture-is-important)
- [How to change data perception from secondary to primary](#how-to-change-data-perception-from-secondary-to-primary)
- [A path from "0" data to lots of data](#a-path-from-0-data-to-lots-of-data)
- [How to avoid getting overwhelmed with data](#how-to-avoid-getting-overwhelmed-with-data)
</div>

{% include youtube.html id="ZxoivsgN3Dc" %}

This is an abridged excerpt from the conversation with [TJ Muehleman](https://www.linkedin.com/in/tjmuehleman/){:target="\_blank"}, the founder at Standard Co, and [Krishnan Raghupathi](https://www.linkedin.com/in/krish-ra/){:target="\_blank"}, Product Manager at Clockwise about the best ways to build a data-centric culture within an organization.

## Topics discussed

- [Why data culture is important](#why-data-culture-is-important)
- [How to change data perception from secondary to primary](#how-to-change-data-perception-from-secondary-to-primary)
- [A path from "0" data to lots of data](#a-path-from-0-data-to-lots-of-data)
- [How to avoid getting overwhelmed with data](#how-to-avoid-getting-overwhelmed-with-data)

## Key takeaways

- If you make data a priority, and require people to back up their decisions with data, data-driven culture builds up very fast.
- You can build a data culture by following the Data Experience Framework. Understand which questions you want to have answers to _before_ you start thinking about what data to collect and how.
- When telling a data story, always keep your audience in mind.

## Our guests

_Krishnan:_ My name is Krishnan Raghupathi, I'm a Product Manager here at Clockwise. I own some of our newer growth initiatives and I'm the PM for our data platform where I’m making sure every department of the company has the data they need to be effective.

_TJ:_ My name is TJ Muehleman, I am the founder and CEO at Standard Co. We are a data platform and we work mostly with global health organizations throughout Africa and South Asia. We help them to collect, clean, and manipulate the data so that we can feed it into a BI platform to actually do analytics and build dashboards. I've been building data systems for a little over 20 years now.

## Why data culture is important

_Maz (Metabase):_ Alright, to kick us off, let’s start with talking about why data culture is important.

_TJ:_ I've always been sort of a very data-centric person, and I have a software engineering background. However, when you get outside of the engineering realm - you see a lot of people who are more reactive with data, meaning they'll go make decisions based on their gut feeling. That’s why what I've been focused on for the last 10 years is: how do we implement a data culture? How do we start using data to guide our decisions?

One good example is our client from Nicaragua who is building water wells. They used to dig water wells based on the suggestions somebody told them. In many cases, it worked out well, but their optimization wasn't there. We helped them to implement a data-driven framework, taking into account where the population needed the water, and where it was clean to prevent poor water treatment.

_Krishnan:_ I have something very similar to that. I wasn't always a data person. I had an “Aha” moment during my work at Microsoft. We launched a new feature and one of my PM mentors brought his entire team together into a room for 90 minutes. He asked everyone in the room to look at the dashboard and ask just one question that will bring the most insights about that launch. In those 90 minutes, the number of insights that we were able to get, and the level of the conscious decision-making process, just opened my eyes. In many meetings like this, we would dig into the data in the real-time and come up with many insights. That was my “Aha” moment and ever since I've been searching for a framework to implement data-driven culture inside the teams.

_TJ:_ People look at the real-time data as some sort of magic. But it’s not - you just have to be thoughtful and proactive about it. When you’re thinking about setting the stage for the next several years, you have to be thinking down the road about how to get an advantage of your data.

I think it is important to know what data you need to have so that you can start making decisions when the time comes. A good example is taking data, staging it, cleaning it, and making sure that it is ready for your use in the BI tool. That way when you’re asked a specific question - you have all means to find an answer to it. With all of the available tools out there, you can answer complicated questions in a matter of minutes.

_Krishnan:_ From a strategic perspective, interacting with the data often informs your mental model of how the world works. The more you consume data, the more you immerse into the data - the more you can decide whether something is an anomaly or whether you need to react to it proactively.

## How to change data perception from secondary to primary

_Maz (Metabase):_ How can we change the perception of data from a “secondary” source of truth to a “primary” source of truth?

_Krishnan:_ One of the things in the product development world is an emphasis on efficiency:
how you can get a product out to users faster? how can you add maximum value in the shortest amount of time? One of the things that helps drive this efficiency are templates and processes. And it is similar for the data. One of the signs of perceiving data as a primary source is making sure it is in place before you even started the product development process. Just that one simple thing is so powerful in switching a mindset from “We have some data and we will use it at some point” to “Data is a primary thing we need to look at before we start working on a new feature”.

One thing I found very useful is building a habit to support any idea with data. That said, if anyone asks a question - it’s always a good idea to dig into the data and find an answer to that.

_TJ:_ As we work with really large organizations we observe their data literacy emerging over the recent time. The way we sold them the idea of being data-informed was demonstration of the utility of a data platform. We started with building small data MVPs for them and demonstrating how they could benefit from it. Three years ago these organizations were very resistant to publishing data and making it more transparent. When they started to see how fewer questions they were getting about data and how their employees could serve themselves - they suddenly started to become very interested in expanding their data coverage.

You have to showcase the concept of why data is important. And what we've found is again, demonstrating utility through micro deployments has been really transformative in terms of changing the mindset about data.

_Krishnan:_ Yes, I would add that anytime you get the question and you don’t know the immediate answer - you should be thinking in your head: “What data will help me to decide it?”. Once this kind of questions start to pop-up automatically - it immediately helps to build a data culture.

> "When someone tells you "I don't know know what to do" - that's an opportunity for you to look for the kind of data available to you."

## A path from "0" data to lots of data

_Maz (Metabase):_ How does one go from the zero state of data to lots of data?

_TJ:_ After working with so many organizations we came up with a Data Experience Framework. We think of it as a similar term to Customer Experience or User Experience.

It is about taking one step back from the question “What data do we need?” to the question “What questions do we have?”. So fundamentally what is the outcome you're looking for? If you have 75 questions - you should simplify them as much as you possibly can and you can always grow from there. Only then you can start thinking of the data collection.

Some questions to ask after the main questions are defined:

- How are you going to collect the data?
- What tools are you going to use to collect it?
- Are you collecting data from a primary or a secondary source?
- Do you need to clean that data?
- Do you need data engineers?
- Do you need data analysts to present the data?
- Last but not least - how would you tell the story?

This goes back to the concept of user experience and customer experience. It's all about storytelling, even in the global health. You have to be compelling in both narrative and visualization to help people understand quickly that something is happening and worth their attention.

_Krishnan:_ That is a great framework, I’m just going to add my experiences to your framework because I’ve seen this exact process play out so many times.

It all starts with the goals. If you are in executive team, you're trying to figure out basic questions like where are my customers coming from, what my revenue looks like, how my churn rate looks like, and those are the fundamental questions you want to answer. For sales team that could be: who are our leads? Who's most interested in our product? Where would I be most effective selling? For marketing, it's which channels are more effective? For customer success, it's who's using the product?

No matter what is the department, there are high level burning questions in their minds. So first it is important to get them down on paper. Then understand the goals and outcomes you want to drive and then having the primitive data that you need to answer. This is a great starting point to shift from “0” state to “10%”.

The problem that often arises next is data literacy. For example, there's a dashboard telling you some information - but what would you do with it? How would you slice and dice this information to get even more useful insights? This requires some data analysis expertise to figure out how would you build your metrics, how would you summarize and group it, etc.

Once you reach that, the last bit is the storytelling - and that’s the piece I’ve seen to be the weakest. So at some point you end up having a lot of data and then suddenly you have no way to put it together to tell the story with it.

_TJ:_ We’ve got very good at telling a story because at some point we put our primary focus on simplicity. So many times I’ve seen dashboards that are so hard to read - that’s because they’ve been built for scientific audience rather than a broader one. You should always ask yourself: who is consuming the data? There is a simple test that I call “The Mom Test”: can I show the dashboard to my mom and be sure she understands it? Of course, if I’m building something for scientists or statisticians - I can go more complex. It’s always about understanding your audience.

## How to avoid getting overwhelmed with data

_Krishnan:_ The best analogy I can think of is going to an airport. When you go into an airport, you're kind of lost: people running around all directions, different signs all around. And if you haven’t a strict guardrail process where you need to check in first, then drop your bags, then go to the security check, get to your gate - you can be easily lost.

It's the same when you have too much data. You need to have some guidance on where to look first. This can be a set of highly curated and cleaned dashboards where you can go and get 80% of your questions answered. From there you can dive deeper and learn more about the particular question.

If at some point you hit the wall where you can’t answer a questions - that's either a gap in the data, or a gap in your knowledge. If there's a gap in the data, you can funnel that request to a data team. And if it's a gap in your knowledge, you need to see whether there are trainings or resources available to help you figure out the next steps.

So the first step when you have a data question is “Do you know where to go to find an answer?’ If the answer is no - then you need to go and organize your data.

_TJ:_ I will add to that that sometimes you just don’t need to have all the data. We had a client who would send us a file with 400 columns. And when I asked whether they use all of them - it turned out they use only 6. Having somebody who is curating the data is important. Metabase is really killing it with [verified collections](/docs/latest/users-guide/collections){:target="\_blank"}. It tells us that this particular collection has been approved and contains true data and these other collections might be experiemnal and not necessarily reliable. That really helps in terms of guiding the final data consumers into the data they can rely on.
