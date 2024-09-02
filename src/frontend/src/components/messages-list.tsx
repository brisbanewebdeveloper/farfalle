import { AssistantMessageContent } from "./assistant-message";
import { Separator } from "./ui/separator";
import { UserMessageContent } from "./user-message";
import { Fragment, memo } from "react";
import {
  ChatMessage,
  MessageRole,
} from "../../generated";
import { ProSearchRender } from "./pro-search-render";

const MessagesList = ({
  messages,
  streamingMessage,
  isStreamingMessage,
  isStreamingProSearch,
  onRelatedQuestionSelect,
}: {
  messages: ChatMessage[];
  streamingMessage: ChatMessage | null;
  isStreamingMessage: boolean;
  isStreamingProSearch: boolean;
  onRelatedQuestionSelect: (question: string) => void;
}) => {
  const streamingProResponse = streamingMessage?.agent_response;
  return (
    <div className="flex flex-col pb-28">
      {messages.map((message, index) =>
        message.role === MessageRole.USER ? (
          <UserMessageContent key={`user-${index}`} message={message} />
        ) : (
          <Fragment key={`assistant-${index}`}>
            {message.agent_response && (
              <ProSearchRender streamingProResponse={message.agent_response} />
            )}
            <AssistantMessageContent
              key={`assistant-${index}`}
              message={message}
              onRelatedQuestionSelect={onRelatedQuestionSelect}
            />
            {index !== messages.length - 1 && <Separator key={`separator-${index}`} />}
          </Fragment>
        ),
      )}
      {isStreamingProSearch && (
        <div className="mb-4">
          <ProSearchRender
            streamingProResponse={streamingProResponse ?? null}
            isStreamingProSearch={isStreamingProSearch}
          />
        </div>
      )}
      {streamingMessage && isStreamingMessage && (
        <AssistantMessageContent
          message={streamingMessage}
          isStreaming={true}
          onRelatedQuestionSelect={onRelatedQuestionSelect}
        />
      )}
    </div>
  );
};

export default memo(MessagesList);
