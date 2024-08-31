import React from 'react';

// https://lucide.dev/icons/
import {
  RotateCwIcon,
  ClipboardIcon,
  TextIcon,
  CheckIcon,
  FilePenIcon,
} from "lucide-react";

import { CopyToClipboard } from 'react-copy-to-clipboard';

export const AnswerActions = ({
  text,
  plaintext,
}: {
  text: string;
  plaintext: string;
}) => {

  const IconRewrite = RotateCwIcon;
  const IconCopy = ClipboardIcon;
  const IconPlainCopy = TextIcon;
  const IconCopied = CheckIcon;
  const IconEdit = FilePenIcon;

  const [copied, setCopied] = React.useState(false);
  const [copiedPlain, setCopiedPlain] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset copied state after a second
  };
  const handleCopyPlain = () => {
    setCopiedPlain(true);
    setTimeout(() => setCopiedPlain(false), 1000); // Reset copied state after a second
  };

  // "navigator.clipboard" is available only for HTTPS
  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     handleCopy();
  //   } catch (err) {
  //     console.error('Failed to copy text: ', err);
  //   }
  // };

  return (
    <div className="flex items-center justify-between pt-3">

      <div className="flex items-center gap-xs">
        <button type="button">
          <div className="flex items-center min-w-0 justify-center gap-xs">
            <IconRewrite size={16} />
            <div className="text-sm pl-1">Rewrite</div>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-x-xs">
        {/*
        <button className="mr-3" onClick={copyToClipboard}>
          {copied ? (
            <IconCopied
              size={16}
              className="animate-in fade-in-25 duration-700"
            />
          ) : (
            <IconCopy size={16} />
          )}
        </button>
        */}
        <button title="Copy" type="button" className="mr-3">
          <CopyToClipboard text={text} onCopy={handleCopy}>
            {copied ? (
              <IconCopied
                size={16}
                className="animate-in fade-in-25 duration-700"
              />
            ) : (
              <IconCopy size={16} />
            )}
          </CopyToClipboard>
        </button>
        <button title="Copy as Plain Text" type="button" className="mr-3">
          <CopyToClipboard text={plaintext} onCopy={handleCopyPlain}>
            {copiedPlain ? (
              <IconCopied
                size={16}
                className="animate-in fade-in-25 duration-700"
              />
            ) : (
              <IconPlainCopy size={16} />
            )}
          </CopyToClipboard>
        </button>
        <button title="Edit Query" type="button">
          <div className="flex items-center min-w-0 justify-center gap-xs">
            <IconEdit size={16} />
            <div className="text-sm pl-1" />
          </div>
        </button>
      </div>

    </div>
  );
};
