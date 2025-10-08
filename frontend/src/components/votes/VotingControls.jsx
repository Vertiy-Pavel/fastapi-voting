import React from 'react';
import Button from '../Button';
import { PiBooksLight } from "react-icons/pi";
import { LiaFireAltSolid } from "react-icons/lia";

const VotingControls = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center sm:justify-start">
            <Button className={`
                    px-3 py-2 text-sm md:text-base flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] transition-colors duration-200
                    ${activeTab === 'active' ? 'bg-[#5BC25B] text-white shadow-lg' : 'bg-neutral-100 text-neutral-800'}
                `}
                onClick={() => onTabChange('active')}>
                <LiaFireAltSolid size={32} />
                <span>Активные голосования</span>
            </Button>

            <Button className={`
                    px-3 py-2 text-sm md:text-base flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] transition-colors duration-200
                    ${activeTab === 'archived' ? 'bg-[#5BC25B] text-white shadow-lg' : 'bg-neutral-100 text-neutral-800'}
                `}
                onClick={() => onTabChange('archived')}>
                <PiBooksLight size={32} />
                <span>Архивные голосования</span>
            </Button>
        </div>
    );
};

export default VotingControls;