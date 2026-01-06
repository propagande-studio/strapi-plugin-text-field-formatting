import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill' | 'stroke'> {
  /**
   * @default "currentColor"
   */
  fill?: keyof DefaultTheme['colors'] | (string & {});
  stroke?: keyof DefaultTheme['colors'] | (string & {});
}
const PluginIcon = (
  { fill: fillProp = 'currentColor', stroke: strokeProp, ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  const { colors } = useTheme();
  const fill =
    fillProp && fillProp in colors ? colors[fillProp as keyof DefaultTheme['colors']] : fillProp;
  const stroke =
    strokeProp && strokeProp in colors
      ? colors[strokeProp as keyof DefaultTheme['colors']]
      : strokeProp;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1063.17 874.07"
      width={16}
      height={16}
      fill={fill}
      stroke={stroke}
    >
      <path d="M635.83,860.22l-57.49-175.55c-2.69-8.22-10.36-13.77-19.01-13.77l-311.99.04c-8.65,0-16.31,5.56-19,13.78l-57.43,175.56c-2.69,8.22-10.36,13.78-19,13.78l-131.89.02c-13.84,0-23.5-13.72-18.82-26.75L300.63,13.26C303.48,5.32,311.01.02,319.45.02L489.53,0c8.43,0,15.95,5.28,18.81,13.21l300.82,833.99c4.7,13.03-4.95,26.78-18.81,26.78l-135.52.02c-8.65,0-16.31-5.56-19.01-13.77ZM304.74,536.74l197.24-.02c13.58,0,23.21-13.26,19.01-26.18l-98.17-302.09c-5.98-18.4-31.99-18.43-38.02-.05l-99.06,302.11c-4.24,12.93,5.39,26.23,19,26.23Z" />
      <path d="M852.61,309.81h-77.44c-8.48,0-16.05,5.31-18.95,13.27l-44.73,123.09c-1.61,4.43-1.62,9.29-.02,13.72l19.11,52.99c6.46,17.92,31.87,17.7,38.04-.32l25-73.09c6.22-18.18,31.93-18.18,38.15,0l65.57,191.71c4.47,13.08-5.25,26.68-19.07,26.68h-66.68c-13.97,0-23.7,13.86-18.96,27l10.97,30.41c2.88,7.99,10.47,13.32,18.96,13.32h93.37c8.6,0,16.26,5.46,19.06,13.6l40.7,118.23c2.8,8.14,10.46,13.6,19.06,13.6h48.23c13.99,0,23.72-13.9,18.95-27.04l-190.38-523.9c-2.9-7.97-10.47-13.27-18.95-13.27Z" />
    </svg>
  );
};
const ForwardRef = forwardRef(PluginIcon);
export default ForwardRef;
