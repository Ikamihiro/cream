import { Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "../../contexts/user.context";
import "./Message.css";

export default function Message({ message }) {
  const { user } = useUser();
  const { type, content, sender, sendAt, isLoading } = message;
  const isSelf = sender.senderId === user._id;

  const getTime = () => {
    let dateString = new Date(sendAt).toLocaleString();
    let [, time] = dateString.split(" ");
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  return (
    <>
      <Flex
        direction={"row"}
        justifyContent={isSelf ? "end" : "start"}
        alignItems={"center"}
        margin={".5rem"}
      >
        <div
          className={"message" + (isSelf ? " message__out" : " message__in")}
        >
          <div className={"message-header"}>
            <div className={"message-title"}>{sender.senderName}</div>
            <div className={"message-options"}>
              {isLoading === false ? (
                <>
                  <div className={"message-date"}>{getTime()}</div>
                  <IconButton
                    variant={"link"}
                    size={"sm"}
                    bg={"#d4dce6"}
                    icon={<IoIosArrowDown />}
                  />
                </>
              ) : (
                <>
                  <Icon as={BiLoaderCircle}></Icon>
                </>
              )}
            </div>
          </div>
          <div className={"message-body"}>
            {type === "image" && (
              <div className="message-body__image">
                <Image src={content} boxSize={"400px"} />
              </div>
            )}

            {type === "text" && (
              <div className="message-body__text">{content.body}</div>
            )}

            {type === "video" && (
              <div className="message-body__video">
                <video width={"400px"} controls={true}>
                  <source src={content} type="video/mp4"></source>
                </video>
              </div>
            )}

            {type === "audio" && (
              <div className="message-body__audio">
                <audio controls>
                  <source src={content} type={"audio/mp3"}></source>
                </audio>
              </div>
            )}

            {type === "document" && (
              <div className="message-body__document">
                <a target={"_blank"} href={content} rel="noreferrer">
                  <Icon as={AiOutlineFilePdf} />
                </a>
              </div>
            )}
          </div>
        </div>
      </Flex>
    </>
  );
}
