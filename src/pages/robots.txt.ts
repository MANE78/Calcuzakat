import type { APIRoute } from "astro";
import { SITE } from "@lib/site";

export const GET: APIRoute = () => {
  const body = `# CalcuZakat — حاسبة الزكاة
# نرحّب بمحرّكات البحث ووكلاء الذكاء الاصطناعي (محتوى توعوي مجاني)

User-agent: *
Allow: /

# Content Signals — تفضيلات استخدام المحتوى (contentsignals.org)
# search=yes : مسموح للفهرسة في محركات البحث
# ai-input=yes : مسموح استخدامه كسياق للإجابة عن أسئلة المستخدمين
# ai-train=yes : مسموح استخدامه في تدريب النماذج (محتوى خيري للتوعية)
Content-Signal: search=yes, ai-input=yes, ai-train=yes

# وكلاء الذكاء الاصطناعي — مسموح لهم بالوصول الكامل
User-agent: GPTBot
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=yes

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=yes

User-agent: Claude-Web
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
