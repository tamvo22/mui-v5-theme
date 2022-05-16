import { styled, ComponentProps } from '@mui/material/styles';
import MuiToolbar, { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';

export const AppBar = styled(MuiAppBar)`
  display: flex;
  align-content: space-between;
  flex-direction: row;
  ${(props) => ({ ...props.theme.mixins.toolbar })}
`;

interface ToolbarProps extends MuiToolbarProps, ComponentProps {}
const ToolbarForwardProps = (props: ToolbarProps) => {
  const { component, ...rest } = props;
  return <MuiToolbar component={component} {...rest} />;
};
export const Toolbar = styled(ToolbarForwardProps)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled('div')`
  font-size: 23px;
  width: 200px;
`;

export const HeaderOffset = styled('div')`
  ${(props) => ({
    padding: props.theme.spacing(0, 1),
    ...props.theme.mixins.toolbar,
  })};
`;
