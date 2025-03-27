---
title:  "Using Notion with Metabase"
redirect_from:
  - /community_posts/using-notion-with-metabase
meta_description: A guide from Metabase user on how to embed Metabase in Notion using CodePen.
date:   2022-02-01 17:10:58
image: /images/community/using-notion-with-metabase.jpg
read_time: 3 minutes
category_filters: "Working with Metabase"
organization: Node
organization_url: https://twitter.com/bottle_of_soul
author: Ting-Shao Kuo
author_img: /images/community/Shao.jpeg
author_bio: Ting-Shao is a software engineer. Besides making software, he keeps improving the team through building up internal systems. You can reach Shao on Twitter [@bottle_of_soul](https://twitter.com/bottle_of_soul){:target="_blank"}.
---

Working in a SAAS company, I know how important our data is, especially when it comes to the behavior of our users. We rely on data a lot in order to constantly make our product better, prioritize features and improve the design.

Understanding the power of data, I started looking for ways to integrate it into our daily workflow. I quickly came up with the idea of integrating our dashboards into a project management tool that is being used by the entire team on the daily basis. I could clearly imagine how that can make our decision-making culture even more data-driven.

In my company, we use Notion as a project management tool and an all-in-one place for various documents like meeting notes, design drafts, guidelines etc.

### Below I’m sharing a 3-step guide on how to embed Metabase in Notion using CodePen

#### Step 1. Copy iframe code in Metabase

Go to the Metabase question that you want to embed in Notion and click the sharing icon at the bottom right corner.

![Screenshot of a chart build with Metabase](/images/community/metabase-notion-1.png)

Then Enable sharing for your question and copy the iframe code.

![Screenshot of enabling sharing option in Metabase](/images/community/metabase-notion-2.png)

#### Step 2. Paste your iframe code in a CodePen

The reason you need to use CodePen is that Notion doesn’t support native iframe code from Metabase, but it does support CodePen.

![Codepen](/images/community/metabase-notion-11.png)

![Codepen](/images/community/metabase-notion-4.png)

After you click “Debug Mode”, a new tab will open up in your browser. Copy the URL of that tab.

#### Step 3. Paste CodePen URL in your Notion page

Open your Notion page and type **“/codepen”** to create a CodePen block.

![Codepen & Notion](/images/community/metabase-notion-5.png)

Paste the copied URL from the last step in the CodePen block and click “Embed link”.

![Embedding link in Notion](/images/community/metabase-notion-6.png)

Now you can see your interactive Metabase charts directly in Notion!

![Metabase embedded in Notion](/images/community/metabase-notion-7.png)

***Please note this is not the official Metabase guide.*** <br/>
***Following these steps will make your dashboards public.***
