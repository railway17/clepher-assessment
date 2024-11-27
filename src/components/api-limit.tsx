import { FC } from 'react';

interface ApiLimitProps {
    message?: string; // Allow customization of the message
}

const ApiLimit: FC<ApiLimitProps> = ({ 
    message = "Your API requests have reached their limit! Try again tomorrow."
}) => {
    return (
        <div className="h-full flex justify-center items-start">
            <p>{message}</p>
        </div>
    );
};

export default ApiLimit;