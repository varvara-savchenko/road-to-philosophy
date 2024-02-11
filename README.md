Clicking on the first link in the main text of an English Wikipedia article, and then repeating the process for subsequent articles, leads to the Philosophy article in 95% of cases. Here's the proof 🙂

### Test structure: 
- open random Wikipedia article
- if random article is Philosophy article:
  - end test
  - log number of redirects 
- if random article is not Philosophy article:
  - click on the first link in the article main content
  - increament redirects by one
- if article was already visited before:
  - end test 
  - Philosophy article can't be reached from this position
    > https://en.m.wikipedia.org/wiki/Ian_Somerhalder to try this edge case
- when Philosophy article is reached:
  - end test
  - log number of redirects
