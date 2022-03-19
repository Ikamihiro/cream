import { Flex } from "@chakra-ui/react"
import Message from "../Message/Message"

export default function ChatBody() {
  return (
    <>
      <Flex
        paddingX={"2rem"}
        paddingY={"1rem"}
        direction={"column"}
        overflowY={"auto"}
        h={"full"}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.07)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Message
          type={"text"}
          content={"Olá!"}
          isSelf={false}
          sender={{
            name: "Fulano A"
          }}
          sendAt={"2022-03-19T11:19:04.642Z"}
        />
        <Message
          type={"text"}
          content={"Olá!"}
          isSelf={true}
          sender={{
            name: "Fulano B"
          }}
          sendAt={"2022-03-19T11:19:04.642Z"}
        />
        <Message
          type={"image"}
          content={"https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg"}
          isSelf={true}
          sender={{
            name: "Fulano B"
          }}
          sendAt={"2022-03-19T11:19:04.642Z"}
        />
        <Message
          type={"video"}
          content={"https://edisciplinas.usp.br/pluginfile.php/5182764/mod_resource/content/1/libras-intro.mp4"}
          isSelf={false}
          sender={{
            name: "Fulano A"
          }}
          sendAt={"2022-03-19T11:19:04.642Z"}
        />
        <Message
          type={"audio"}
          content={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"}
          isSelf={true}
          sender={{
            name: "Fulano B"
          }}
          sendAt={"2022-03-19T11:19:04.642Z"}
        />
      </Flex>
    </>
  )
}