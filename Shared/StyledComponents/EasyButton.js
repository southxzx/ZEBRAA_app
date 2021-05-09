import styled, { css } from 'styled-components';

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    align-self: flex-end;
    justify-content: center;
    background: transparent;

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
            background: #5cb85c;
        ` 
    }
    ${(props) => 
        props.secondary && 
        css`
            background: #62b1f6;
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
            width: 135px
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