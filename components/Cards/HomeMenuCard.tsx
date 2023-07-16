import { Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';
import tw, { styled } from 'twin.macro';

interface BaseHomeMenuCardProps {
  onClick: () => void;
  icon: IconType;
  title: string;
}

type HomeMenuCardProps = BaseHomeMenuCardProps;

const HomeMenuCard: FC<HomeMenuCardProps> = (props) => {
  const { onClick, icon, title } = props;
  return (
    <StyledHomeMenuCard>
      <div className="home-card__container" onClick={() => onClick()}>
        {icon && (
          <Icon
            mr="4"
            fontSize="4.25rem"
            className="home-card__icon"
            _hover={{
              color: '#fff',
            }}
            color={'#601bd0'}
            as={icon}
          />
        )}
        <h3 tw="text-center ">{title}</h3>
      </div>
    </StyledHomeMenuCard>
  );
};

export default HomeMenuCard;

const StyledHomeMenuCard = styled.div`
  width: 100%;
  .home-card__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1.5px solid #601bd0;
    cursor: pointer;
    height: 13.5rem;
    min-width: 12rem;
    width: 100%;
    &:hover {
      transform: scale(1.03);
      background-color: #601bd0;
      h3 {
        color: #ffffff;
      }
      ${tw`shadow-xl`}

      .home-card__icon {
        color: #ffffff;
      }
    }
    ${tw`transition-all duration-300 shadow-md`}
  }

  h3 {
    font-weight: 600;
    color: #601bd0;
    text-align: center;
    ${tw`text-lg`}
  }

  @media (min-width: 1024px) {
    width: unset;

    .home-card__container {
      width: 12rem;
    }
  }
`;
