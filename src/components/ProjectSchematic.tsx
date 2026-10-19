import type { Project } from '../data/projects'

type ProjectSchematicProps = {
  project: Project
  large?: boolean
}

function RealtimeSchematic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-border-strong">
        <rect x="24" y="36" width="88" height="56" rx="4" />
        <rect x="136" y="72" width="88" height="72" rx="4" />
        <rect x="248" y="36" width="88" height="56" rx="4" />
        <path d="M112 64 H136" strokeDasharray="3 3" />
        <path d="M224 108 H248" strokeDasharray="3 3" />
        <path d="M180 72 V52 H248" strokeDasharray="3 3" />
      </g>
      <circle cx="68" cy="64" r="4" fill={accent} opacity="0.9" />
      <circle cx="180" cy="108" r="5" fill={accent} />
      <circle cx="292" cy="64" r="4" fill={accent} opacity="0.75" />
      <text x="36" y="120" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        CLIENT
      </text>
      <text x="150" y="168" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        SOCKET
      </text>
      <text x="262" y="120" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        STATE
      </text>
    </svg>
  )
}

function AdminSchematic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-border-strong">
        <rect x="28" y="28" width="304" height="164" rx="4" />
        <path d="M28 56 H332" />
        <path d="M96 56 V192" />
        {[0, 1, 2, 3].map((row) => (
          <path key={row} d={`M96 ${84 + row * 24} H320`} opacity="0.55" />
        ))}
      </g>
      <rect x="40" y="38" width="36" height="8" rx="2" fill={accent} opacity="0.85" />
      <rect x="112" y="68" width="72" height="8" rx="2" fill="currentColor" className="text-border" />
      <rect x="200" y="68" width="96" height="8" rx="2" fill="currentColor" className="text-border" />
      <rect x="112" y="116" width="56" height="8" rx="2" fill={accent} opacity="0.45" />
      <text x="40" y="150" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        MODULES
      </text>
      <text x="112" y="184" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        TABLES · FORMS · API
      </text>
    </svg>
  )
}

function FlowSchematic({ accent }: { accent: string }) {
  const steps = ['Discover', 'Decide', 'Contribute']
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      {steps.map((label, index) => {
        const x = 36 + index * 108
        return (
          <g key={label}>
            <rect
              x={x}
              y="70"
              width="84"
              height="64"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border-strong"
            />
            <circle
              cx={x + 42}
              cy="102"
              r="6"
              fill={accent}
              opacity={0.55 + index * 0.2}
            />
            <text
              x={x + 42}
              y="158"
              textAnchor="middle"
              className="fill-text-soft"
              style={{ fontSize: 9, letterSpacing: '0.1em' }}
            >
              {label.toUpperCase()}
            </text>
            {index < steps.length - 1 ? (
              <path
                d={`M${x + 84} 102 H${x + 108}`}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="text-border-strong"
              />
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

function GameSchematic({ accent }: { accent: string }) {
  const cells = Array.from({ length: 16 }, (_, i) => i)
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g transform="translate(98, 34)">
        {cells.map((cell) => {
          const col = cell % 4
          const row = Math.floor(cell / 4)
          const active = [5, 6, 9, 10].includes(cell)
          return (
            <rect
              key={cell}
              x={col * 42}
              y={row * 42}
              width="34"
              height="34"
              rx="3"
              fill={active ? accent : 'transparent'}
              fillOpacity={active ? 0.35 : 0}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border-strong"
            />
          )
        })}
      </g>
      <text x="108" y="208" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        STATE · FEEDBACK · LOOP
      </text>
    </svg>
  )
}

function LearningSchematic({ accent }: { accent: string }) {
  const chapters = [0, 1, 2, 3, 4]
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-border-strong">
        <rect x="40" y="36" width="180" height="148" rx="6" />
        <path d="M40 64 H220" />
        {chapters.map((row) => (
          <path
            key={row}
            d={`M58 ${88 + row * 18} H200`}
            opacity={0.45 + row * 0.08}
          />
        ))}
        <rect x="236" y="56" width="84" height="108" rx="6" />
      </g>
      <rect x="56" y="46" width="48" height="8" rx="2" fill={accent} opacity="0.85" />
      <rect x="252" y="74" width="52" height="8" rx="2" fill={accent} opacity="0.55" />
      <rect x="252" y="96" width="40" height="8" rx="2" fill="currentColor" className="text-border" />
      <rect x="252" y="118" width="48" height="8" rx="2" fill="currentColor" className="text-border" />
      <text x="56" y="204" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        GUIDE · LABS · LIVE
      </text>
    </svg>
  )
}

function AlgorithmSchematic({ accent }: { accent: string }) {
  const bars = [48, 92, 64, 120, 78, 104, 56, 88]
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g transform="translate(52, 40)">
        {bars.map((height, index) => (
          <rect
            key={index}
            x={index * 32}
            y={130 - height}
            width="22"
            height={height}
            rx="3"
            fill={index === 3 || index === 5 ? accent : 'transparent'}
            fillOpacity={index === 3 || index === 5 ? 0.55 : 0}
            stroke="currentColor"
            strokeWidth="1"
            className="text-border-strong"
          />
        ))}
      </g>
      <text x="52" y="204" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        SORT · SEARCH · DEMO
      </text>
    </svg>
  )
}

function LinuxSchematic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-border-strong">
        <rect x="48" y="40" width="264" height="132" rx="8" />
        <path d="M48 68 H312" />
      </g>
      <circle cx="68" cy="54" r="4" fill={accent} opacity="0.8" />
      <circle cx="84" cy="54" r="4" fill="currentColor" className="text-border" />
      <circle cx="100" cy="54" r="4" fill="currentColor" className="text-border" />
      {[0, 1, 2, 3].map((row) => (
        <rect
          key={row}
          x="68"
          y={86 + row * 18}
          width={120 + (row % 3) * 28}
          height="8"
          rx="2"
          fill={row === 1 ? accent : 'currentColor'}
          fillOpacity={row === 1 ? 0.55 : 0.2}
          className="text-border-strong"
        />
      ))}
      <text x="48" y="204" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        SHELL · ADMIN · WORKFLOWS
      </text>
    </svg>
  )
}

function DockerSchematic({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden>
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect
            x={56 + col * 90}
            y="58"
            width="72"
            height="90"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border-strong"
          />
          <rect
            x={68 + col * 90}
            y="74"
            width="48"
            height="10"
            rx="2"
            fill={col === 1 ? accent : 'currentColor'}
            fillOpacity={col === 1 ? 0.7 : 0.2}
            className="text-border"
          />
          <rect
            x={68 + col * 90}
            y="96"
            width={36 + col * 4}
            height="8"
            rx="2"
            fill="currentColor"
            className="text-border"
            opacity="0.35"
          />
        </g>
      ))}
      <path
        d="M128 103 H146 M218 103 H236"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        className="text-border-strong"
      />
      <text x="56" y="204" className="fill-text-soft" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
        IMAGE · COMPOSE · LABS
      </text>
    </svg>
  )
}

function renderSchematic(project: Project) {
  const accent = project.accent
  switch (project.id) {
    case 'rean-algorithm':
      return <AlgorithmSchematic accent={accent} />
    case 'rean-linux':
      return <LinuxSchematic accent={accent} />
    case 'rean-docker':
      return <DockerSchematic accent={accent} />
    case 'rean-git':
      return <LearningSchematic accent={accent} />
    default:
      break
  }

  switch (project.category) {
    case 'Learning':
      return <LearningSchematic accent={accent} />
    case 'Real-time':
      return <RealtimeSchematic accent={accent} />
    case 'Web Application':
      return <AdminSchematic accent={accent} />
    case 'Product':
      return <FlowSchematic accent={accent} />
    case 'Mini App':
    case 'Game':
      return <GameSchematic accent={accent} />
    default:
      return <LearningSchematic accent={accent} />
  }
}

export default function ProjectSchematic({
  project,
  large = false,
  compact = false,
}: ProjectSchematicProps & { compact?: boolean }) {
  return (
    <div
      className={[
        'relative overflow-hidden bg-bg-alt/70',
        compact
          ? 'min-h-[140px] border-b border-border'
          : large
            ? 'min-h-[260px] border-b border-border sm:min-h-[320px] lg:min-h-full md:border-b-0 md:border-r'
            : 'min-h-[180px] border-b border-border sm:min-h-[200px] md:border-b-0 md:border-r',
      ].join(' ')}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 20% 20%, ${project.accent}18, transparent 55%)`,
        }}
      />
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 sm:top-4 sm:left-4">
        <span className="annotation">{project.category}</span>
      </div>
      <div
        className={[
          'relative flex h-full items-center justify-center px-4 text-text-muted',
          compact ? 'py-7' : large ? 'py-10 sm:py-12' : 'py-8 sm:py-10',
        ].join(' ')}
      >
        <div
          className={
            compact
              ? 'h-[100px] w-full max-w-xs'
              : large
                ? 'h-[180px] w-full max-w-md sm:h-[210px]'
                : 'h-[140px] w-full max-w-sm'
          }
        >
          {renderSchematic(project)}
        </div>
      </div>
      <p className="absolute right-3 bottom-3 font-mono text-[10px] tracking-[0.16em] text-text-soft uppercase sm:right-4 sm:bottom-4">
        fig · {project.id}
      </p>
    </div>
  )
}
