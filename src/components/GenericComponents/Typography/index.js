import PropTypes from "prop-types";
import styled from "styled-components";

const TypographyText = styled.h2`
  color: ${({ color }) => color};
  word-break: ${(props) => props.breakword};
  font-family: ${(props) => props.fontFamily};
  text-transform: ${({ textTransform }) => textTransform};
  text-align: ${({ align }) => align};
  font-weight: ${({ weight }) => weight};
  font-style: ${(props) => props.fstyle};
  display: ${(props) => props.display};
  max-width: ${(props) => props.maxWidth};
  overflow: ${(props) => props.overflow};
  white-space: ${(props) => props.whiteSpace};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  text-overflow: ${(props) => props.textOverflow};
  && {
    font-size: ${({ size }) => size};
    line-height: ${({ lineHeight }) => lineHeight};
  }

  ${({ as, responsive }) => {
    const sizes = {
      h1: { px: "45px", sm: "33px" },
      h2: { px: "40px", sm: "32px" },
      h3: { px: "32px", sm: "28px" },
      h4: { px: "28px", sm: "24px" },
      h5: { px: "24px", sm: "20px" },
      h6: { px: "20px", sm: "16px" },
      p: { px: "18px", sm: "16px" },
      span: { px: "16px", sm: "14px" },
      label: { px: "14px", sm: "12px" },
    };

    const lineHeight = {
      h1: { px: "72px", sm: "54px" },
      h2: { px: "60px", sm: "52.5px" },
      h3: { px: "48px", sm: "42px" },
      h4: { px: "42px", sm: "36px" },
      h5: { px: "36px", sm: "30px" },
      h6: { px: "30px", sm: "24px" },
      p: { px: "27px", sm: "24px" },
      span: { px: "24px", sm: "21px" },
      label: { px: "21px", sm: "18px" },
    };

    const fontSizeStyles = `
      font-size: ${sizes[as].px};
      line-height: ${lineHeight[as].px};
    `;

    if (responsive) {
      // console.log("responsive", responsive);
      return `
        ${fontSizeStyles}

        @media (max-width: 768px) {
          font-size: ${sizes[as].sm}  !important;
          line-height: ${sizes[as].sm} !important;
        }
      `;
    }

    return fontSizeStyles;
  }}
`;

export default function Typography({ text, children, ...rest }) {
  return <TypographyText {...rest}>{children || text}</TypographyText>;
}

Typography.propTypes = {
  className: PropTypes.string,
  fontFamily: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  breakword: PropTypes.string,
  align: PropTypes.string,
  weight: PropTypes.string,
  whiteSpace: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  as: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "label",
  ]),
  responsive: PropTypes.bool,
  children: PropTypes.node,
};

Typography.defaultProps = {
  as: "h2",
  align: "left",
  weight: "normal",
  color: "#000000",
  breakword: "break-word",
  responsive: false,
  text: "",
  whiteSpace: 'break-spaces',
  children: null,
  className: "",
  border:"",
  padding:"",
  borderRadius:"",
};
