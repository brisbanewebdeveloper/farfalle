import React, { ReactElement, useRef } from 'react';

// https://lucide.dev/icons/
import {
  RotateCwIcon,
  ClipboardIcon,
  TextIcon,
  CheckIcon,
  FilePenIcon,
} from "lucide-react";

import * as Tooltip from './ui/tooltip';

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

  const ref = useRef<HTMLDivElement>(null);

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

  // Not using the packages like "copy-to-clipboard"
  // because the package seems to have some issues with handling new line codes
  const getText = async (text: string, cb: CallableFunction) => {

    // "navigator.clipboard" is available only for HTTPS
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    } else {
      const doc = new DOMParser().parseFromString(text, 'text/html');
      text = '' + doc.body.textContent;
      const input = document.createElement('textarea');
      ref.current?.appendChild(input);
      input.value = text;
      input.focus();
      input.select();
      document.execCommand('Copy');
      input.remove();
    }

    // Enable to show the animation
    cb();
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

  return (
    <div ref={ref} className="flex items-center justify-between pt-3">

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
          <button type="button" className="mr-3" onClick={() => getText(text, handleCopy)}>
            {copied ? (
              <IconCopied
                size={16}
                className="animate-in fade-in-25 duration-700"
              />
            ) : (
              <IconCopy size={16} />
            )}
          </button>,
          'Copy'
        )}

        {/* Copy as Plain Text */}
        {item(
          <button type="button" className="mr-3" onClick={() => getText(plaintext, handleCopyPlain)}>
            {copiedPlain ? (
              <IconCopied
                size={16}
                className="animate-in fade-in-25 duration-700"
              />
            ) : (
              <IconPlainCopy size={16} />
            )}
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
