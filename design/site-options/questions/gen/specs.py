import json, copy
D='/home/jack/repos/whatisgeo/.claude/worktrees/site-options/design/site-options/questions/'
ref=json.load(open('/home/jack/repos/design-system/.claude/worktrees/whatisgeo-site-options/_work/hero-reuse/stage-whatisgeo/home.json'))
nav=copy.deepcopy([m for m in ref['modules'] if m.get('section')=='l-nav-01-marketing-top-nav'][0])
nav['note']='the live top bar: wordmark, three routes, "Stay in the loop" as the outlined action, the review date as the status token'
nav['props']['links']=[{"label":"The guide","href":"/guide/"},{"label":"All guides","href":"/guides/"},{"label":"Get started","href":"/guide/#first-30-days"}]
nav['props']['secondary_href']='/#updates'
foot=copy.deepcopy([m for m in ref['modules'] if m.get('section')=='l-foot-01-sitemap-footer'][0])
foot['omit']=['ds-footer__ai-rail']
foot['wrap']={'class':'c-foot'}
foot['omit']=['ds-footer__ai-rail','ds-footer__legal-links','ds-footer__status']
foot['note']='small sitemap footer: the wordmark at nav size, three link groups, the legal line; no giant wordmark, no AI tiles'
foot['props']['brand_tagline']='A practical, source-linked guide to Generative Engine Optimisation (GEO) for business owners and marketers.'
foot['props']['groups'][0]['links']=[{"label":"The guide","href":"/guide/"},{"label":"All guides","href":"/guides/"},{"label":"Get started","href":"/guide/#first-30-days"}]
skip={"html":"<a class=\"ds-button-secondary x-skip\" href=\"#main\"><span class=\"ds-button-secondary__label\">Skip to content</span></a>"}
def page(title,desc,body,current=None,home=False):
    n=copy.deepcopy(nav)
    if current:
        for l in n['props']['links']:
            if l['label']==current: l['current']=True
    mods=[{"file":"../_stage/style.html"},{"file":"partials/_style.html"},skip,n]
    if not home: mods.append({"file":"partials/ask.html"})
    mods.append({"html":"<main id=\"main\">"})
    if home: mods.append({"file":"../_stage/hero.html"})
    mods+= [{"file":"partials/%s.html"%b} for b in body]
    mods+=[{"html":"</main>"},foot]
    if home: mods.append({"file":"../_stage/script.html"})
    return {"$comment":"Option C · questions. Every page is question/answer rows: question left (5/12), answer right (7/12) with the hero's blue footnotes to real guide.md lines.","title":title,"description":desc,"lang":"en-GB","theme":"whatisgeo","attributes":ref['attributes'],"replace":ref['replace'],"modules":mods}
P={
 'home':page("What is GEO? A practical guide to Generative Engine Optimisation","A practical, source-linked guide to Generative Engine Optimisation (GEO) for business owners and marketers.",['home-guide','home-faq','home-guides','signup'],home=True),
 'guide':page("The guide · What is GEO?","The whole GEO guide, chapter by chapter, each headed by the question it answers.",['guide-head','guide-body','guide-wayon','guide-sources'],current="The guide"),
 'article':page("AI Mode vs AI Overviews: Differences and What to Do","AI Overviews are a summary Google adds to some ordinary results pages. AI Mode is a separate conversational search.",['article-head','article-body','article-faq','article-sources','article-next']),
 'mcp':page("What is GEO MCP server: use this site from your AI assistant","whatisgeo.app has a free, read-only MCP server at https://whatisgeo.app/mcp.",['mcp-head','mcp-body']),
}
for k,v in P.items(): json.dump(v,open(D+k+'.json','w'),indent=2,ensure_ascii=False)
print('ok')
