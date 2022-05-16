import { styled, ComponentProps } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import MuitToolbar, { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';
import NextLink from '@/com/ui/Link';

interface ToolbarProps extends MuiToolbarProps, ComponentProps {}
const ToolbarForwardProps = (props: ToolbarProps) => {
  const { component, ...rest } = props;
  return <MuitToolbar component={component} {...rest} />;
};
export const Toolbar = styled(ToolbarForwardProps)`
  width: 100%;
  max-width: 70vw;
  justify-content: flex-end;
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

export const Stack = styled(MuiStack)`
  transition: width 4s ease-out;
  overflow: hidden;
  width: 100%;
  max-width: 70vw;
  justify-content: flex-end;
  align-items: center;
`;

export const Link = styled(NextLink)`
  font-size: 18px;
  color: #fff;
  margin-right: 48px;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.palette.secondary.main};
    text-decoration: none;
  }
`;
