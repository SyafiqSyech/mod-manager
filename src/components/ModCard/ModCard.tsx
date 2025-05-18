import React from 'react';
import { Project } from '../../types/project';
import { formatNumber } from '../../utilities/numberFormatter';
import { IconCheck, IconDeviceDesktop, IconDownload, IconPlus, IconServer2, IconX } from "@tabler/icons-react";

interface ModCardProps {
  project: Project;
  isListed: boolean;
}

export const ModCard: React.FC<ModCardProps> = ({ project, isListed = false }) => {
  return (
    <div className='bg-[#26292f] hover:bg-[#1e2125] rounded-xl p-2 grid grid-cols-[1fr_auto_1fr] gap-4'>
      <div className='flex gap-2 items-center overflow-hidden'>
        <img src={project.imageUrl} alt='Mod Image' className='w-16 h-16 rounded-lg border-1 border-[#44464f] bg-[#33363d]' />
        <div className='flex flex-col overflow-hidden'>
          <p className='font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis' title={project.title}>{project.title}</p>
          <p className='text-gray-400 text-xs'>{project.versions.join(', ')}</p>
          <div className='flex gap-1 pt-1'>
            {project.loaders.map(loader => (
              <p key={loader} className='text-gray-400 text-xs rounded-full border-1 border-[#44464f] px-2'>{loader.charAt(0).toUpperCase() + loader.slice(1)}</p>
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-center items-center'>
        <div className={`w-16 h-16 p-1 rounded-lg border-1 border-[#44464f] flex flex-col justify-center items-center gap-1 ` + (project.client_side === 'required' ? 'bg-[#44464f]' : '') + (project.client_side === 'optional' ? 'bg-[#2b3042]' : '') + (project.client_side === 'unknown' ? 'bg-black' : '')}>
          <IconDeviceDesktop color='#99a1af' size={24} />
          <p className='text-gray-400 font-bold text-xs'>Client</p>
        </div>
        <div className={`w-16 h-16 p-1 rounded-lg border-1 border-[#44464f] flex flex-col justify-center items-center gap-1 ` + (project.server_side === 'required' ? 'bg-[#44464f]' : '') + (project.server_side === 'optional' ? 'bg-[#2b3042]' : '') + (project.server_side === 'unknown' ? 'bg-black' : '')}>
          <IconServer2 color='#99a1af' size={24} />
          <p className='text-gray-400 font-bold text-xs'>Server</p>
        </div>
      </div>
      <div className='flex flex-col gap-1 justify-center items-end'>
        <div className='flex gap-1 items-center'>
          <IconDownload color='#99a1af' size={16} stroke={3} />
          <p className='font-semibold text-gray-400'>{formatNumber(project.downloads)}</p>
          <p className='text-gray-400'>downloads</p>
        </div>
        {isListed ? (
          <div className='group/button border-2 bg-[#1fe577] border-[#1fe577] hover:bg-[#f5292a] hover:border-[#f5292a] rounded-lg flex gap-1 py-0.5 px-2 items-center cursor-pointer'>
            <IconCheck color='#26292f' size={16} stroke={3} className='group-hover/button:hidden' />
            <p className='font-medium text-[#26292f] group-hover/button:hidden'>Added</p>
            <IconX color='#26292f' size={16} stroke={3} className='group-hover/button:block hidden' />
            <p className='font-medium text-[#26292f] group-hover/button:block hidden'>Remove</p>
          </div>
        ) : (
          <div className='group/button border-2 border-[#1ea75e] hover:border-[#1fe577] rounded-lg flex gap-1 py-0.5 px-2 items-center cursor-pointer'>
            <IconPlus color='#1ea75e' size={16} stroke={3} className='group-hover/button:stroke-[#1fe577]' />
            <p className='font-medium text-[#1ea75e] group-hover/button:text-[#1fe577]'>Add</p>
          </div>
        )}
      </div>
    </div>
  );
}