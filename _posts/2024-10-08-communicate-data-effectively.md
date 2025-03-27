---
title: "Communicate Data Effectively"
summary: "Learn how to present data clearly. Use TL;DRs, simplify slides, highlight key points, and make confident recommendations for better decisions."
date: 2024-10-08 00:05:05
last_updated_at: 2024-10-08 00:05:05
categories: "Analytics and BI"
author: Thomas Schmidt
featured_image: /images/posts/data-storytelling.jpg
image: /images/posts/data-storytelling.jpg
layout: post
canonical: https://dataanalysis.substack.com/p/how-to-communicate-data-effectively
---

This post was originally published in the [Data Analysis Journal](https://dataanalysis.substack.com/p/how-to-communicate-data-effectively){:target="\_blank"} and written by our analytics engineer, Thomas Schmidt.

## TL;DR: Bridge the gap between data and decision-making with clear, actionable communication

- **Understand the core problem** and tailor your message to your audience's needs.
- **Start with a TL;DR:** Summarize key insights upfront to respect executives' time.
- **Keep it concise.** Remove unnecessary details and clutter from presentations.
- **Use colors intentionally.** Highlight key points and create visual connections.
- **Make bold statements.** Provide confident recommendations, using appendices for details.

_→ Implement these strategies in your next presentation to ensure your data insights drive informed decisions._

Have you ever tried getting directions in a foreign country from someone who doesn’t speak your language? That’s how I felt the first time I presented a complex data analysis to an executive team. While the data made sense to me, it felt like I was speaking a foreign language to them. Just like a translator bridges gaps, we need to translate our analyses into something executives can act on. Effective communication isn’t just about sharing insights—it’s about ensuring those insights are understood and drive decisions. In this post, I’ll share lessons I’ve learned on turning data into clear, actionable messages for executives.

### Identify the real problem and tailor your message to the audience's needs

In our data jobs, we are often driven by curiosity and the joy of solving problems using data. However, it's crucial to understand two key aspects before diving into analytics projects: the core problem and the audience.

#### Understand the Core Problem

Stakeholders often approach us with a proposed solution in mind (“I need data X”). By digging into the 'why' and understanding the core problem behind the request, we can choose a better approach that serves their needs, leading to better project outcomes. Knowing the problem you are trying to solve will inform your decisions and influence what next steps you recommend.

#### Know your audience

We don’t want to find ourselves in a situation where our audience feels like we are speaking a foreign language to them. Executives haven't been along for the entire analytical journey that we went through. Thus, we need to translate our findings for them. Before crafting a communication, consider the following

- **Identify what's important to them and their current priorities.** Usually, this means strategic insights and actionable recommendations are preferred over details of the fancy machine learning algorithm you used for the project.
- **What do we need to explain and what do they already know?** Executives usually operate on a more abstract level and don’t necessarily know (and care) about each tiny detail of a process. Speak your audiences’ (domain) language! Explain acronyms or don’t use them at all. Not everyone knows what an “ICP” (Ideal Customer Profile) is and depending on the domain it might even mean different things.
- **How to start our narrative to get folks excited.** Talking to the head of sales? If you start by telling them that this will give them insights on how to beat the competitor, you will have their attention.
- **What is the best presentation format.** Each format has its pros and cons: A written document might be good for async communication but folks will be “alone” while reading it. You cannot clarify things with your words compared to a live presentation where they can directly ask questions (but it might be hard to find an overlapping time slot with the executives). Be sure to be thoughtful about that.
- **Assess your relationship and level of trust.** At Shopify we used the concept of a trust battery. Make sure you know “how charged it is” - this will influence how folks perceive and hear you, and how you need to adjust your communication.

Don’t try to communicate to too many people at once: In case your audience is too broad, try to narrow it down to the decision-maker and tailor your communication to their needs.

#### Provide a concise summary (TL;DR) upfront and keep messages clear and direct

Executives need quick access to essential insights to make informed decisions promptly. In the fast-paced world of business, they juggle multiple priorities and have limited time for detailed reports. This is where the concept of TL;DR (Too Long; Didn’t Read) becomes invaluable. I first learned about this concept while working at Shopify where we used a similar approach for our communication (be it for presentations, reports or even longer Slack messages). Let’s give it a try:

Executives will love you when you start using TL;DRs:

- **Quick insights for busy executives.** TL;DR provides essential information upfront for prompt decision-making.
- **Effective crafting tips.** Summarize core findings and recommendations, avoiding jargon and using clear language.
- **Position for impact.** Place TL;DR at the beginning of presentations or reports to immediately capture attention.
- **End with a recommendation.** Always have a call to action in the form of a recommendation or provocative question.

→ Adopt the TL;DR approach to enhance clarity and efficiency in executive communications.

When crafting a powerful TL;DR, the focus should be on what is most relevant and important to the audience:

- Summarize core findings and recommendations in a few sentences.
- Use clear, straightforward language, avoiding jargon.
- Use formatting to highlight key points with bullet points and bold text.
- End with an actionable recommendation or provocative question.
- Always position the TL;DR at the very beginning to capture the audience’s attention immediately.

**Pro Tip:** Add links to specific slides or sections with detailed data for those who want to dive deeper.

**Example of a Well-Crafted TL;DR:**

Example: Improving Customer Service Response Times

TL;DR: Faster response times lead to higher customer satisfaction.

- Implementing the new ticketing system reduced average response time by 50%.
- Customer satisfaction scores increased by 20% after the change.
  → Recommendation: Expand the system to all customer service teams.

A side note: We also want to make sure to use KPI precision that makes sense for executives. They are usually not interested in the decimal precision number. Thus, rounding is mostly fine (except you know your audience will care about it).
If you want to read more about TL;DRs, find some additional instructions in [this article](https://medium.com/meta-research/writing-a-memorable-tl-dr-ea751cba88f2){:target="\_blank"}.

### Time is Everything and Less is More

As we learned in the TL;DR section, attention is a limited resource in our day to day world and we need to fight for it. Here are some tips that have worked well for me in the past, along with good and bad examples.

#### Respect your Colleagues' Time

Apart from using TL;DRs, make sure to use concise and direct communication. Avoid “bullshit” and unnecessary information (here is a good [book](https://bernoff.com/books){:target="\_blank"} on that topic) and aim for placing your main message in the headline of your messages, slides or report sections.

Use concise and direct communication. Avoid unnecessary information and place your main message in the headline.

This message could use some work:
![Long Slack message](/images/posts/long-slack-message.png)

Better version:
![Short Slack message](/images/posts/short-slack-message.png)

The 2nd message lets you parse the information quicker and decide whether it is relevant and you want to dig deeper (i.e. continue reading in the thread). There are a lot of great additional examples in the book “[writing without bullshit](https://bernoff.com/books){:target="\_blank"}” in case you want to read further.

#### Simplify slides and reports by reducing text and eliminating non-essential elements

The above tips connect well with the next topic we are going to cover: Clutter.

In the Slack message example above you saw a lot of additional information that did not support the message e.g.

- “I listened [...] on my Podcast Addict app […] I made 40km that day” → Your target audience will not care! Make a post in the #biking channel or tell your friends instead if you need to.
- “It is like an hour long but I can totally recommend it to you” → If someone decides to check out the link, they will figure that out.

These are extreme examples but we tend to add such “clutter” to our presentations or reports as well. When was the last time you listened to a presentation and started thinking about something else since you could not follow all the information on that single slide? In those cases, the presenter lost your attention because of cognitive overload. Decluttering can help to reduce the cognitive load for your audience and make it less effort to parse your presentation or report.

Things you can start doing today:

1. **Reduce the amount of text.** When you give a presentation, your slides don’t necessarily need a lot of text. You will talk the audience through anyways. Note, this can be different for slides folks consume on their own - here it can be helpful to give them context with few annotations.
2. **Challenge each element in your chart.** Look at each of your axes, labels, data points, grid lines, and ask yourself: Would eliminating this element change anything? If the answer is no, get rid of it.
3. **Avoid gifs or animations.** If not helpful for your message, avoid them. Our brains get distracted by such content very quickly. Only use if there is a very good reason.

If you are using a BI tool, you will usually also find options to reduce clutter there.
Here is an example that uses Metabase, an open source BI tool (which, as you know, is behind the blog you're reading right now.). It mostly comes with reasonable defaults but we can still tweak it a bit:

This chart could use some work:
![Metabase chart example 1](/images/posts/metabase-chart-example-1.png)

Better version:
![Metabase chart example 2](/images/posts/metabase-chart-example-2.png)

#### Apply colors consistently to create visual connections and highlight key points

Colors are a very powerful tool in our communication tool box - if used wisely and consistent.
Make sure to be intentional about your use of color. One of my favorite examples is to use it for visual connections between slide titles and my charts where I try to color a category I mention in the same way as it would appear in the chart. Additionally, you can use black vs. gray color and bold vs. normal text to create a visual hierarchy. This helps guide the consumer through the content. Here is an example:

This chart could use some work:
![Metabase color example 1](/images/posts/Metabase-color-example-1.png)

Better version:
![Metabase color example 2](/images/posts/Metabase-color-example-2.png)

Adding a clear indication of when the Shop redesign happened that led to the increased AOV can help us make our story stand out. This helps to reduce the cognitive load and allows your colleagues to process the content in a shorter time while increasing the chance that they perceive your message. This can also help across slides: If you stay with your color palette, your audience will quickly realize and it can be powerful to connect the dots with your previous story.

#### Give clear, confident recommendations and use appendices for details

“Don’t caveat everything”

Once, an executive at Shopify told me that Data Scientists tend to caveat everything and he often wished that folks were bolder about their recommendations. While it is natural as data professionals to want to highlight the nuances and limitations of our analysis, it is important to remember that executives are looking for clear, actionable insights. They prefer confident recommendations to make strategic decisions quickly over being walked through the details of your analysis.

Some examples:

- Caveated Statement: _"If the proposed customer retention strategy is implemented and the market response is favorable, we might see a potential decrease in customer churn by up to 5%."_
- Bold Statement: _"Implementing the proposed customer retention strategy will decrease customer churn by 5%."_
- Caveated Statement: _"While there are multiple factors to consider, and it’s possible that some variables might change, we believe that the new feature could potentially improve user engagement."_
- Bold Statement: _"The new feature will improve user engagement."_

You might argue that there are cases where it is important to add caveats. A good approach in those cases is to have an appendix and refer to it. This might give you more confidence and executives have the chance to dig deeper if needed. However, they mostly will ask you directly if questions arise.

In conclusion, effective communication with executives requires thoughtful consideration of their time and needs. By understanding the problem and your audience, starting with a TL;DR, removing clutter, using colors wisely, and making bold statements, you can ensure your insights are understood and lead to actionable decisions. Implement these strategies in your next presentation or report to enhance clarity and effectiveness in executive communications.
