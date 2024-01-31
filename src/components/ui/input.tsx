"use client";
import { cn } from "@/utils/cn";
import * as React from "react";
import MaskedInput, { type Mask } from "react-text-mask";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	render?: React.ReactNode;
	containerClassName?: string;
	labelClassName?: string;
	help?: string;
	icons?: [
		React.FC<{ className?: string }> | undefined | null,
		(React.FC<{ className?: string }> | null)?,
	];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, help, value, containerClassName, labelClassName, render, type, error, icons, ...props },
    ref,
  ) => {
    return (
      <div className={cn("flex flex-col h-fit w-full relative group text-primary-foreground", containerClassName)}>
        {render ? (
          render
        ) : (
          <input
            className={cn(
              error && '!border-destructive',
              'peer text-white flex w-full border-[3px] rounded-full px-8 text-lg border-white/80 focus:border-white outline-none py-4 bg-transparent placeholder:text-white/60 file:border-0 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
              className,
              {
                'pl-12': !!icons?.[0],
                'pr-12': !!icons?.[1] || type === 'password',
              },
            )}
            ref={ref}
            {...{ ...props, value }}
          />
        )}
        <p className="absolute -bottom-6 text-muted-foreground text-sm">{help}</p>

        {icons?.map(
          (Icon, i) =>
            Icon && (
              <div
                key={i.toString()}
                className={cn('absolute top-1/2 -translate-y-1/2', {
                  'left-4': i === 0,
                  'right-4': i === 1,
                })}
              >
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
            ),
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

const InputMask = React.forwardRef<
	HTMLInputElement,
	InputProps & { mask: Mask; showMask?: boolean }
>(({ mask, error, showMask, ...props }, ref) => {
	return (
		<MaskedInput
			mask={mask}
			guide={showMask}
			ref={ref as (instance: MaskedInput | null) => void}
			{...props}
			render={(innerRef, inputProps) => (
				<Input
					ref={innerRef as (instance: HTMLInputElement | null) => void}
					error={error}
					{...inputProps}
				/>
			)}
		/>
	);
});
InputMask.displayName = "InputMask";

export { Input, InputMask };
