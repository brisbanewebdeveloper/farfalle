import React, { ReactElement } from 'react';

// https://lucide.dev/icons/
import {
  RotateCwIcon,
  ClipboardIcon,
  TextIcon,
  CheckIcon,
  FilePenIcon,
} from "lucide-react";

import * as Tooltip from './ui/tooltip';
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

  const handleRewrite = () => {
    alert('Answer is to be regenerated');
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset copied state after a second
  };

  const handleCopyPlain = () => {
    setCopiedPlain(true);
    setTimeout(() => setCopiedPlain(false), 1000); // Reset copied state after a second
  };

  const handleEdit = () => {
    alert('To enable to edit the prompt');
  };

  const item = (triggerItem: ReactElement, tooltipText: string) => (
    <Tooltip.TooltipProvider delayDuration={200}>
      <Tooltip.Tooltip>
        <Tooltip.TooltipTrigger asChild>
          {triggerItem}
        </Tooltip.TooltipTrigger>
        <Tooltip.TooltipContent>
          {tooltipText}
        </Tooltip.TooltipContent>
      </Tooltip.Tooltip>
    </Tooltip.TooltipProvider>
  );

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

      {/* Rewrite */}
      <div className="flex items-center gap-xs">
        {item(
          <button type="button" onClick={handleRewrite}>
            <div className="flex items-center min-w-0 justify-center gap-xs">
              <IconRewrite size={16} />
              <div className="text-sm pl-1">Rewrite</div>
            </div>
          </button>,
          'Rewrite the answer'
        )}
      </div>

      {/* Copy */}
      <div className="flex items-center gap-x-xs">

        {item(
          <button type="button" className="mr-3">
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
          </button>,
          'Copy'
        )}

        {/* Copy as Plain Text */}
        {item(
          <button type="button" className="mr-3">
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
          </button>,
          'Copy as Plain Text'
        )}

        {/* Edit Query */}
        {item(
          <button type="button" onClick={handleEdit}>
            <div className="flex items-center min-w-0 justify-center gap-xs">
              <IconEdit size={16} />
              <div className="text-sm pl-1" />
            </div>
          </button>,
          'Edit Query'
        )}

      </div>

    </div>
  );
};
