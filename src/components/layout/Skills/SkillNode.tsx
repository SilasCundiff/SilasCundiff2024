import { Skill } from '@/helpers/Skills'
import { SKILL_NODE_PADDING, SKILL_NODE_SIZE } from '@/helpers/constants'
import { getStrokeColor } from '@/helpers/utils'

const SkillNode = ({ name, position, linkPosition, iconUrl, description, unlocks, tree }: Skill) => {
  const xPos = position[0]
  const yPos = position[1]
  const stroke = getStrokeColor(tree)

  return (
    <>
      {linkPosition && (
        <line
          x1={position[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y1={position[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          x2={linkPosition[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y2={linkPosition[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          stroke={`#ffffff9f`}
          strokeWidth={2}
        />
      )}
      <g
        data-tooltip-id='tooltip'
        data-node-tooltip={name}
        data-tooltip-content={description}
        data-tooltip-unlocks={`${unlocks ? 'Required for: ' + unlocks : ''}`}
        className='outline-none cursor-pointer'
      >
        <rect
          x={xPos + SKILL_NODE_PADDING}
          y={yPos + SKILL_NODE_PADDING}
          width={SKILL_NODE_SIZE}
          height={SKILL_NODE_SIZE}
          fill={`#041237`}
          stroke={`${stroke}`}
        />
        {iconUrl && (
          <image
            x={xPos + SKILL_NODE_PADDING * 1.2}
            y={yPos + SKILL_NODE_PADDING * 1.2}
            width={SKILL_NODE_SIZE * 0.8}
            height={SKILL_NODE_SIZE * 0.8}
            xlinkHref={iconUrl}
          />
        )}
      </g>
    </>
  )
}

export default SkillNode
