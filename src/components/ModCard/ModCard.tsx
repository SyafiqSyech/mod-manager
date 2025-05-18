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
    <div className='bg-bg-secondary hover:bg-bg-secondary-muted rounded-xl p-2 grid grid-cols-[1fr_auto_1fr] gap-4'>
      <div className='flex gap-2 items-center overflow-hidden'>
        <img src={project.imageUrl} alt='Mod Image' className='w-16 h-16 rounded-lg border-1 border-[#44464f] bg-[#33363d]' />
        <div className='flex flex-col overflow-hidden'>
          <p className='font-bold text-contrast whitespace-nowrap overflow-hidden text-ellipsis' title={project.title}>{project.title}</p>
          <p className='text-primary text-xs'>{project.versions.join(', ')}</p>
          <div className='flex gap-1 pt-1'>
            {project.loaders.map(loader => (
              <p key={loader} className='text-primary text-xs rounded-full border-1 border-[#44464f] px-2'>{loader.charAt(0).toUpperCase() + loader.slice(1)}</p>
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-center items-center'>
        <div className='w-16 flex flex-col justify-center items-center gap-1'>
          <div className='text-center flex items-center gap-1'>
            <IconDeviceDesktop className='stroke-primary' size={18} />
            <p className='text-primary text-xs'>
              Client
            </p>
          </div>
          <p className={`font-bold text-sm ` + (project.client_side == 'unknown' ? 'text-danger' : '') + (project.client_side == 'required' ? 'text-accent' : '') + (project.client_side == 'optional' ? 'text-attention' : '')}>
            {project.client_side == 'unsupported' ? '-' : project.client_side.charAt(0).toUpperCase() + project.client_side.slice(1)}
          </p>
        </div>
        <div className='w-16 flex flex-col justify-center items-center gap-1'>
          <div className='text-center flex items-center gap-1'>
            <IconServer2 className='stroke-primary' size={18} />
            <p className='text-primary text-xs'>
              Server
            </p>
          </div>
          <p className={`font-bold text-sm ` + (project.server_side == 'unknown' ? 'text-danger' : '') + (project.server_side == 'required' ? 'text-accent' : '') + (project.server_side == 'optional' ? 'text-attention' : '')}>
            {project.server_side == 'unsupported' ? '-' : project.server_side.charAt(0).toUpperCase() + project.server_side.slice(1)}
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-1 justify-center items-end'>
        <div className='flex gap-1 items-center'>
          <IconDownload className='stroke-primary' size={16} stroke={3} />
          <p className='font-semibold text-primary'>{formatNumber(project.downloads)}</p>
          <p className='text-primary'>downloads</p>
        </div>
        {isListed ? (
          <div className='group/button border-2 bg-accent border-accent hover:bg-danger hover:border-danger rounded-lg flex gap-1 py-0.5 px-2 items-center cursor-pointer'>
            <IconCheck className='stroke-bg-secondary group-hover/button:hidden' size={16} stroke={3} />
            <p className='font-medium text-bg-secondary group-hover/button:hidden'>Added</p>
            <IconX className='stroke-bg-secondary group-hover/button:block hidden' size={16} stroke={3} />
            <p className='font-medium text-bg-secondary group-hover/button:block hidden'>Remove</p>
          </div>
        ) : (
          <div className='group/button border-2 border-accent-muted hover:border-accent rounded-lg flex gap-1 py-0.5 px-2 items-center cursor-pointer'>
            <IconPlus className='stroke-accent-muted group-hover/button:stroke-accent' size={16} stroke={3} />
            <p className='font-medium text-accent-muted group-hover/button:text-accent'>Add</p>
          </div>
        )}
      </div>
    </div>
  );
}