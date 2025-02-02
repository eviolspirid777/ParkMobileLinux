"use client"

import Media from "react-media"
import { Tiles } from "../Tiles"
import { TilesMobile } from "../TilesMobile/TilesMobile"

export const TilesWrapper = () => {
  return (
      <Media
        queries={{
          telephone: "(max-width: 1024px)",
          computer: "(min-width: 1025px)",
        }}
      >
        {(matches) => <>{matches.computer ? <Tiles /> : <TilesMobile />}</>}
      </Media>
  )
}