---
title:  "A/B test checklist"
redirect_from:
  - /community_posts/a-b-test-checklist
meta_description: A brief guide on A/B tests covering only the essential information you’ll need - steps, concepts, and must-know terminology.
date:   2022-02-22 10:10:58
image: /images/community/b-test-checklist.jpg
read_time: 4 minutes
category_filters: "Metrics"
organization: MyFitnessPal
organization_url: https://www.myfitnesspal.com/
author: Olga Berezovsky
author_img: /images/community/olga_berezovsky.jpeg
author_bio: Olga Berezovsky, Senior Data Analytics Manager at MyFitnessPal. Born in Ukraine, based in San Francisco. She is a writer for [Data Analysis Journal](https://dataanalysis.substack.com){:target="_blank"} and a member/volunteer at PyLadies, Women Who Code, and Women in Analytics. She has extensive experience in the Big Data industry - specifically in data acquisition, transformation, and analysis - and deep expertise in building quantitative and qualitative user profile analysis that reveals user insights and behavior.

---

There are so many good materials already written on running A/B tests, and yet it can be so difficult to search through them to find the right explanations for basic questions.
Below is a brief guide covering only the essential information you’ll need - steps, concepts, and must-know terminology. It’s aimed more towards junior analysts who are getting started with experimentation but also can be used as a resource to quickly pull from for things like significance calculators.
So keep that list close and reread as needed.

## Steps for conducting a product experiment

### Can you test it?

You can’t A/B test every little thing. New experiences or new product releases can’t be run through the A/B test (read -  [How To Measure Product Adoption](https://dataanalysis.substack.com/p/how-to-measure-product-adoption-issue-39c){:target="_blank"}). Potential bias - [novelty effect](https://productds.com/wp-content/uploads/Novelty_Effect.html){:target="_blank"} or change aversion.

### Formulate a Hypothesis

Why do you have to run the experiment? What is the ROI? Is it a good time to run the test? Consider seasonality, new version releases, open bugs, etc.
Set the rate you expect - this is your [Minimum Detectable Effect](https://splitmetrics.com/resources/minimum-detectable-effect-mde/){:target="_blank"} (MDE). Why do you need to have the MDE? This is the smallest acceptable difference between the Control and Variant. If Variant is 0.0001% better than the Control, would you still want to run the test? Is it worth the cost and time?

### Finalize your set of metrics

For A/B analysis, I use a set of 3 metrics:

- Success metrics;
- Ecosystem metrics (company KPIs);
- Tradeoff metrics;

More described here - [How To Pick The Right Metric](https://dataanalysis.substack.com/p/how-to-pick-the-right-metric-issue){:target="_blank"}.

### Calculate sample size

- Set your significance, confidence interval, and power.
- Your group experiment sizes should be the same.
- Your sample should be randomly distributed. Recognize traffic, device, returning users, etc. Work with the engineering team on testing and ensure that the randomization algorithm works as expected (hashing, clustering, sample stratification?).
- Make sure there is no bias introduced with other tests running.

### Run the test

Do it until you reach significance. Monitor the test timeline and events.

### Evaluate results

- Run sanity checks. Control metrics and conversions should match with the Baseline. If they don’t, question the test setup.
- Check sample variance and distribution.
- Run spot checks. Pick a few users from Control and Variant samples and check them to ensure they are random, not overlapping with other tests, and are meeting the test requirements.
- If the result is not what you expected, think of the potential bias - novelty effect, learning effect, network effect.

### Draw conclusions

Provide a recommendation on the next steps to product owners.

***

## Things to remember

- Run [the A/A test](https://vwo.com/blog/aa-test-before-ab-testing/){:target="_blank"} first. It helps you check the software, outside factors, and natural variance. You would need to know the sample variance to estimate the significance level and statistical power.
- Don’t pick metrics that are either too sensitive (views) or too robust (Day 7 or Day 30 retention). They are not helpful and tend to mislead you. The best test metric would show a change in the result and would not fluctuate much when other events are occurring.
- Don't run the experiment for too long, as you might experience data pollution - the effect when multiple devices, cookies, and other outside factors affect your result.
- Don’t run the experiment for too little time either, as you might get a false positive ([regression to the mean](https://dataanalysis.substack.com/p/these-tricky-ab-tests-or-why-significance){:target="_blank"}). In other words, when a variable is extreme at first but then moves closer to the average.
- When introducing a new change, run the test on a smaller sample for a longer period of time to eliminate the novelty or learning effect bias.

***

📢 Use [this calculator](https://www.optimizely.com/sample-size-calculator/){:target="_blank"} or [this one](https://www.evanmiller.org/ab-testing/sample-size.html){:target="_blank"} to determine the needed sample size for your experiment. <br>
📢 Use [this calculator](http://www.abtestcalculator.com/){:target="_blank"} to evaluate your test significance and result.

## Statistical terminology

**To approach A/B testing, you can think of Null-Hypothesis testing and apply the following terms:**

- P-value - assuming Null-H is true, what is the probability of seeing a specific result? If data is in the "not expected" region, we reject Null-H.
- [Statistical Significance](https://hbr.org/2016/02/a-refresher-on-statistical-significance){:target="_blank"} (or Significance level, alpha) is a probability of seeing the effect when none exists (false positive).
- [Statistical Power](https://productcoalition.com/start-here-statistics-for-a-b-testing-5f5c7e02ce1e){:target="_blank"} (or 1-beta) is the probability of seeing the effect when it does exist.
- [Confidence Interval](https://cxl.com/blog/confidence-intervals/){:target="_blank"}  is the number of allowed errors or measurement of estimated reliability: the smaller CI, the more accurate the result.
- [z-score](https://evolytics.com/resources/calculators/abtesting-statistical-significance/){:target="_blank"} is the number of Standard Deviations from the mean.
Read more guides and tutorials about data analysis in my weekly newsletter and advice column  - Data Analysis Journal.

Read more guides and tutorials about data analysis in my weekly newsletter and advice column  - [Data Analysis Journal](https://dataanalysis.substack.com){:target="_blank"}.
