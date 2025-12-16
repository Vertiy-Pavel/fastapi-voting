import React from 'react';
import Button, {ToggleButton} from '../Button';
import { PiBooksLight } from "react-icons/pi";
import { LiaFireAltSolid } from "react-icons/lia";

const VotingControls = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-start">
            <ToggleButton className={`${activeTab === 'active' ? 'bg-[#5BC25B] text-white shadow-lg' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'} w-full lg:w-auto`}
                onClick={() => onTabChange('active')}>
                <LiaFireAltSolid size={24} />
                Активные голосования
            </ToggleButton>

            <ToggleButton className={`${activeTab === 'archived' ? 'bg-[#5BC25B] text-white shadow-lg' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'} w-full lg:w-auto`}
                onClick={() => onTabChange('archived')}>
                <PiBooksLight size={24} />
                Архивные голосования
            </ToggleButton>
        </div>
    );
};

export default VotingControls;