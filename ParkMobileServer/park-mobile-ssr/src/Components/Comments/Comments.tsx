import styles from "./Comments.module.scss"

export const Comments = () => {
  return (
    <div
      className={styles["comments-block"]}
    >
      <div
        style={{
          width:"560px",
          height:"600px",
          overflow:"hidden",
          position:"relative"
        }}
      >
        <iframe
          style={{
            width:"100%",
            height:"100%",
            border:"1px solid #e6e6e6",
            borderRadius:"8px",
            boxSizing:"border-box"
          }}
          src="https://yandex.ru/maps-reviews-widget/46363028237?comments"
        />
        <a
          href="https://yandex.ru/maps/org/usadba_izmaylovo/46363028237/"
          target="_blank"
          style={{
            boxSizing:"border-box",
            textDecoration:"none",
            color:"#b3b3b3",
            fontSize:"10px",
            fontFamily:"YS Text,sans-serif",
            padding:"0 20px",
            position:"absolute",
            bottom:"8px",
            width:"100%",
            textAlign:"center",
            left:"0"
          }}
        >
          Усадьба Измайлово на карте Москвы — Яндекс.Карты
        </a>
      </div>
    </div>
  )
}