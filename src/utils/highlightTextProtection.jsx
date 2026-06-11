import css from "@/components/Planes/Planes.module.css"; 

//! Функція підсвічування тексту та допоміжна функція
//* Використання RegExp з экрануванням допоміжною функцією:
export function onHighlightTextProtection(text, keyword) {
  if (!keyword) return text;

  const escapedKeyword = escapeRegExp(keyword);

  const regex = new RegExp(
    `(${escapedKeyword})`,
    "gi"
  );

  return text
    .split(regex)
    .map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? (
          <span
            key={index}
            className={css.highlight}
          >
            {part}
          </span>
        )
        : part
    );
};

//* Якщо користувач буде вводити: . + * ? [ ] ( )
//* то RegExp потрібно екранувати допоміжною функцією:
function escapeRegExp(str) {
  return str.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};
