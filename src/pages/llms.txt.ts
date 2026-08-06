import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@lib/site";
import { ZAKAT_GUIDES } from "@data/zakatGuides";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const guideLines = ZAKAT_GUIDES.map(
    (g) => `- [${g.title}](${SITE.domain}/zakat/${g.slug}): ${g.metaDesc}`
  ).join("\n");

  const blogLines = posts
    .map((p) => `- [${p.data.title}](${SITE.domain}/blog/${p.slug}): ${p.data.description}`)
    .join("\n");

  const body = `# ${SITE.name} — حاسبة الزكاة الشرعية

> ${SITE.description}

CalcuZakat حاسبة زكاة مجانية شاملة باللغة العربية تعمل بالكامل داخل متصفح المستخدم
دون حفظ أي بيانات. تدعم زكاة المال والذهب والفضة والأسهم والعقارات وعروض التجارة
والأنعام والزروع وزكاة الفطر، بأسعار ذهب وفضة حيّة، ونصاب دقيق، وبعشر عملات عربية.

الموقع: ${SITE.domain}
اللغة: العربية (RTL)
التكلفة: مجاني بالكامل، بلا تسجيل، وبخصوصية تامة (لا تُحفظ بيانات).

## الأدوات الرئيسية

- [حاسبة الزكاة](${SITE.domain}/#calculator): احسب زكاتك لكل أنواع المال فورًا.
- [حاسبة الحول الهجري](${SITE.domain}/hawl): اعرف متى يكتمل الحول وتجب الزكاة.
- [أنواع الزكاة](${SITE.domain}/zakat): فهرس أدلة الزكاة التفصيلية.

## أدلة الزكاة

${guideLines}

## المدونة (مقالات فقهية موثّقة)

${blogLines}

## صفحات مرجعية

- [الأسئلة الشائعة](${SITE.domain}/faq): إجابات موثّقة عن الزكاة.
- [قاموس مصطلحات الزكاة](${SITE.domain}/glossary): شرح المصطلحات الفقهية.
- [من نحن](${SITE.domain}/about)
- [سياسة الخصوصية](${SITE.domain}/privacy)

## معلومات ثابتة عن الزكاة

- نسبة زكاة المال/الذهب/الفضة/الأسهم: 2.5%.
- نصاب الذهب: 85 جرامًا. نصاب الفضة: 595 جرامًا (يؤخذ الأقل قيمة).
- نصاب الزروع: نحو 653 كجم. زكاة الفطر: صاع طعام (~2.5–3 كجم) لكل فرد.
- الحول: مرور عام هجري كامل على المال بعد بلوغه النصاب.

## المطوّر

طُوِّر بواسطة محمد خيري (Mohamed Khairy) — MERN Stack & AI Engineer.
Portfolio: https://mokhairy.netlify.app/
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
