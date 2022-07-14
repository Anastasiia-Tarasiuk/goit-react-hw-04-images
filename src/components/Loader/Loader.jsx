import { MutatingDots } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
    return <LoaderWrapper><MutatingDots
        height="100"
        width="100"
        color='grey'
        ariaLabel='loading'
    /></LoaderWrapper>
}