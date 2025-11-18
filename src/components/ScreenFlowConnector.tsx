import React, { useId } from 'react';
import clsx from 'clsx';

export type ScreenFlowStep = {
  id: string;
  media: React.ReactNode;
  kicker?: string;
  title?: string;
  body?: string;
  descriptionPlacement?: 'top' | 'bottom' | 'split';
  containerClassName?: string;
  descriptionClassName?: string;
  mediaWrapperClassName?: string;
  mediaClassName?: string;
  connectorToNext?: FlowConnectorMeta;
};

type FlowConnectorMeta = {
  label?: string;
  description?: string;
  variant?: 'arc' | 'straight';
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  icon?: React.ReactNode;
};

export type ScreenFlowConnectorProps = {
  steps: ScreenFlowStep[];
  layout?: 'horizontal' | 'vertical';
  /**
   * When true, a horizontal layout stacks vertically on small screens
   * while keeping the desktop layout intact.
   */
  stackOnMobile?: boolean;
  arrowColor?: string;
  arrowThickness?: number;
  className?: string;
};

export function ScreenFlowConnector({
  steps,
  layout = 'horizontal',
  stackOnMobile = true,
  arrowColor = '#1F1B2D',
  arrowThickness = 2,
  className = '',
}: ScreenFlowConnectorProps) {
  if (!steps.length) return null;

  const isHorizontal = layout === 'horizontal';

  const wrapperClass = clsx(
    'flex w-full',
    isHorizontal
      ? stackOnMobile
        ? 'flex-col gap-10 md:flex-row md:items-start'
        : 'flex-row items-start gap-10'
      : 'flex-col gap-10 items-center',
  );

  const content = steps.reduce<React.ReactNode[]>((acc, step, index) => {
    acc.push(<FlowScreenCard key={step.id} step={step} />);

    if (index < steps.length - 1) {
      const connector = step.connectorToNext ?? {};
      acc.push(
        <FlowArrow
          key={`${step.id}-arrow`}
          orientation={connector.orientation ?? (isHorizontal ? 'horizontal' : 'vertical')}
          variant={connector.variant ?? 'arc'}
          color={connector.color ?? arrowColor}
          thickness={connector.thickness ?? arrowThickness}
          label={connector.label}
          description={connector.description}
          icon={connector.icon}
          responsive={stackOnMobile && isHorizontal}
        />,
      );
    }
    return acc;
  }, []);

  return (
    <div className={clsx('ScreenFlowConnector w-full', className)}>
      <div className={wrapperClass}>{content}</div>
    </div>
  );
}

type FlowScreenCardProps = {
  step: ScreenFlowStep;
};

function FlowScreenCard({ step }: FlowScreenCardProps) {
  const {
    kicker,
    title,
    body,
    descriptionPlacement = 'bottom',
    containerClassName = '',
    descriptionClassName = '',
    mediaWrapperClassName = '',
    mediaClassName = '',
    media,
  } = step;

  const renderTopDescription = () => {
    if (descriptionPlacement === 'top') {
      return (
        <DescriptionBlock
          title={title}
          body={body}
          descriptionClassName={descriptionClassName}
        />
      );
    }

    if (descriptionPlacement === 'split' && title) {
      return (
        <DescriptionBlock
          title={title}
          descriptionClassName={descriptionClassName}
        />
      );
    }

    return null;
  };

  const renderBottomDescription = () => {
    if (descriptionPlacement === 'top') return null;

    if (descriptionPlacement === 'split') {
      if (!body) return null;
      return (
        <DescriptionBlock
          body={body}
          descriptionClassName={descriptionClassName}
        />
      );
    }

    if (!title && !body) return null;
    return (
      <DescriptionBlock
        title={title}
        body={body}
        descriptionClassName={descriptionClassName}
      />
    );
  };

  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center gap-4 text-center md:max-w-xs md:flex-shrink-0',
        containerClassName,
      )}
    >
      <div className="space-y-2">
        {kicker && (
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A79883]"
            style={{ fontFamily: 'Aeonik Extended' }}
          >
            {kicker}
          </span>
        )}
        {renderTopDescription()}
      </div>

      <div
        className={clsx(
          'w-full max-w-[280px] rounded-[2.5rem] border border-black/5 bg-white/95 p-4 shadow-[0_20px_45px_rgba(9,5,24,0.15)] backdrop-blur',
          mediaWrapperClassName,
        )}
      >
        <div
          className={clsx(
            'rounded-[2rem] border border-black/5 bg-[#F8F5EE] p-2',
            mediaClassName,
          )}
        >
          {typeof media === 'string' ? (
            <img
              src={media}
              alt={title ?? body ?? 'Flow screen'}
              className="h-auto w-full rounded-[1.5rem] object-cover"
            />
          ) : (
            media
          )}
        </div>
      </div>

      {renderBottomDescription()}
    </div>
  );
}

type DescriptionBlockProps = {
  title?: string;
  body?: string;
  descriptionClassName?: string;
};

function DescriptionBlock({
  title,
  body,
  descriptionClassName = '',
}: DescriptionBlockProps) {
  if (!title && !body) return null;
  return (
    <div className={clsx('space-y-1 text-center', descriptionClassName)}>
      {title && (
        <p
          className="text-base font-semibold text-[#16101E]"
          style={{ fontFamily: 'Aeonik Extended' }}
        >
          {title}
        </p>
      )}
      {body && (
        <p
          className="text-sm leading-relaxed text-[#4B4130]"
          style={{ fontFamily: 'Aeonik' }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

type FlowArrowProps = {
  orientation: 'horizontal' | 'vertical';
  variant: 'arc' | 'straight';
  color: string;
  thickness: number;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  responsive?: boolean;
};

function FlowArrow({
  orientation,
  variant,
  color,
  thickness,
  label,
  description,
  icon,
  responsive = false,
}: FlowArrowProps) {
  const id = useId();
  const horizontalPath =
    variant === 'arc' ? 'M8 68 C 72 8 108 8 172 68' : 'M8 40 H172';
  const verticalPath =
    variant === 'arc' ? 'M16 16 C 64 72 64 108 16 164' : 'M40 16 V164';

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center gap-3 text-center text-[#827661]',
        orientation === 'horizontal'
          ? 'flex-col md:min-w-[96px] md:flex-row'
          : 'flex-col',
      )}
    >
      {(label || description || icon) && (
        <div className="flex flex-col items-center gap-1">
          {icon}
          {label && (
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{ fontFamily: 'Aeonik Extended' }}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#A39683]" style={{ fontFamily: 'Aeonik' }}>
              {description}
            </span>
          )}
        </div>
      )}
      <div className={clsx('w-full', orientation === 'horizontal' ? 'max-w-[150px]' : 'max-w-[100px]')}>
        {responsive ? (
          <>
            <ArrowSvg
              key="mobile"
              className="w-full pb-2 md:hidden"
              markerId={`${id}-vertical`}
              path={verticalPath}
              viewBox="0 0 80 180"
              color={color}
              thickness={thickness}
            />
            <ArrowSvg
              key="desktop"
              className="hidden w-full md:block"
              markerId={`${id}-horizontal`}
              path={horizontalPath}
              viewBox="0 0 180 80"
              color={color}
              thickness={thickness}
            />
          </>
        ) : (
          <ArrowSvg
            className="w-full"
            markerId={`${id}-default`}
            path={orientation === 'horizontal' ? horizontalPath : verticalPath}
            viewBox={
              orientation === 'horizontal' ? '0 0 180 80' : '0 0 80 180'
            }
            color={color}
            thickness={thickness}
          />
        )}
      </div>
    </div>
  );
}

type ArrowSvgProps = {
  className?: string;
  markerId: string;
  path: string;
  viewBox: string;
  color: string;
  thickness: number;
};

function ArrowSvg({
  className = '',
  markerId,
  path,
  viewBox,
  color,
  thickness,
}: ArrowSvgProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={clsx('mx-auto h-20', className)}
      aria-hidden="true"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,8 L8,4 Z" fill={color} />
        </marker>
      </defs>
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
}


