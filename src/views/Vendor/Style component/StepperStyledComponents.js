import styled from 'styled-components';

export const Tabs = styled.div`
    position: relative;
    font-size: 1.25rem;
    width: 100%;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

export const TabLinkList = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex !important;
    justify-content: space-between !important;
`;

export const TabLink = styled.li`
    position: relative;
    display: inline-block;
    text-decoration: none;
    padding: 0.8rem 0.8rem;
    cursor: pointer;
    margin-left: 1px;
    z-index: 2;

    color: ${({ active }) => (active ? 'white' : 'black')};
    background: ${({ active }) => (active ? '-moz-linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
    background: ${({ active }) => (active ? '-webkit-linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
    background: ${({ active }) => (active ? 'linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
    filter: ${({ active }) =>
        active ? "progid:DXImageTransform.Microsoft.gradient( startColorstr='#05abe0', endColorstr='#8200f4',GradientType=1 )" : ' '};
    transition-duration: ${({ active }) => (active ? 'all 0.6s ease-in-out' : ' ')};
    transition-timing-function: ${({ active }) => (active ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : ' ')};
    font-weight: ${({ active }) => (active ? '500' : 'none')};

    &:hover {
        background: -moz-linear-gradient(45deg, #4182ab 30%, #266293 70%);
        background: -webkit-linear-gradient(45deg, #4182ab 30%, #266293 70%);
        background: linear-gradient(45deg, #4182ab 30%, #266293 70%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#05abe0', endColorstr='#8200f4',GradientType=1 );
        transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        color: white;

        :after {
            content: '';
            position: absolute;
            top: 100%;
            left: calc(50% - 10px);
            background: ${({ active }) => (active ? '-moz-linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
            background: ${({ active }) => (active ? '-webkit-linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
            background: ${({ active }) => (active ? 'linear-gradient(45deg, #266293 30%, #4182AB 70%)' : ' ')};
            width: ${({ active }) => (active ? '20px' : '0')};
            height: ${({ active }) => (active ? '20px' : '0')};

            /* The points are: (left top: x y, right top: x y, center bottom: x y) */
            clip-path: polygon(0 0, 100% 0, 50% 50%);
        }
    }

    &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: calc(50% - 10px);
        background: -moz-linear-gradient(45deg, #4182ab 30%, #266293 70%);
        background: -webkit-linear-gradient(45deg, #4182ab 30%, #266293 70%);
        background: linear-gradient(45deg, #4182ab 30%, #266293 70%);
        width: ${({ active }) => (active ? '20px' : '0')};
        height: ${({ active }) => (active ? '20px' : '0')};

        /* The points are: (left top: x y, right top: x y, center bottom: x y) */
        clip-path: polygon(0 0, 100% 0, 50% 50%);
    }
`;

export const TabLinkContent = styled.span`
    display: block;
    text-align: center;
`;
