import styled, { css } from 'styled-components';

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 15px;
    padding: 10px;
    align-self: center;
    justify-content: center;
    align-items: center;
    background: transparent;

    ${(props) =>
      props.maxWidth &&
      css`
          width: 100%;
      `
    }

    ${(props) => 
        props.justIcon &&
        css`
            background: #f48c06;
            margin: 0;
            padding: 5px;
            border-radius: 20px;
            align-self: flex-end;
            justify-content: flex-end;  
        `
    }
    ${(props) =>
        props.primary &&
        css`
            background: #f48c06;
        ` 
    }
    ${(props) => 
        props.secondary && 
        css`
            background: #54b175;
        `
    }
    ${(props) => 
        props.danger && 
        css`
            background: #f40105;
        `
    }
    ${(props) => 
        props.large &&
        css`
            width: 100%
        `
    }
    ${(props) => 
        props.medium &&
        css`
            width: 100px
        `
    }
    ${(props) => 
        props.small &&
        css`
            width: 40px
        `
    }
`;

export default EasyButton;