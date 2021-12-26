/* eslint-disable jsx-a11y/anchor-has-content */
import { Dispatch, FC, SetStateAction } from 'react';

import { FfmpegOutputArgs, mimeTypes } from './FfmpegTool';

interface SettingFormProps {
  uploadedFile: File | null;
  message: string;
  doTranscode: () => Promise<void>;
  ffmpegOutputArgs: FfmpegOutputArgs;
  setFfmpegOutputArgs: Dispatch<SetStateAction<FfmpegOutputArgs>>;
}

export const SettingsForm: FC<SettingFormProps> = ({
  uploadedFile,
  message,
  doTranscode,
  ffmpegOutputArgs,
  setFfmpegOutputArgs
}) => {
  const inputFileName = uploadedFile?.name;
  const inputFileFormat = uploadedFile?.name.split('.')[1];
  const outputFileFormat =
    ffmpegOutputArgs.format === '' ? inputFileFormat : ffmpegOutputArgs.format;

  return (
    <div className='relative min-w-256 w-96 flex flex-col justify-center'>
      <h2 className='font-serif text-xl text-center mb-4'>Choose the parameters</h2>
      <form className='flex justify-center italic gap-4'>
        <div className='flex flex-col'>
          <label htmlFor='resolution' className='text-xs'>
            Resolution
          </label>
          <select
            name='Resolution'
            id='resolution'
            className='input'
            value={ffmpegOutputArgs.resolution}
            onBlur={(e) => setFfmpegOutputArgs({ ...ffmpegOutputArgs, resolution: e.target.value })}
            onChange={(e) =>
              setFfmpegOutputArgs({ ...ffmpegOutputArgs, resolution: e.target.value })
            }>
            <option value=''>Default</option>
            <option value='scale=426:240'>240p</option>
            <option value='scale=640:360'>360p</option>
            <option value='scale=854:480'>480p</option>
            <option value='scale=1280:720'>720p</option>
            <option value='scale=1920:1080'>1080p</option>
          </select>
        </div>
        {/*<div className='flex flex-col'>
          <label htmlFor='codec' className='text-xs'>
            Codec
          </label>
          <select name='Codec' id='codec' className='input'>
            <option value='H.264'>H.264</option>
            <option value='MP4'>MP4</option>
            <option value='MP4'>MP4</option>
            <option value='MP4'>MP4</option>
          </select>
        </div>*/}
        <div className='flex flex-col'>
          <label htmlFor='format' className='text-xs'>
            Format
          </label>
          <select
            name='Format'
            id='format'
            className='input'
            value={outputFileFormat}
            onBlur={(e) =>
              setFfmpegOutputArgs({
                ...ffmpegOutputArgs,
                format: e.target.value as keyof typeof mimeTypes
              })
            }
            onChange={(e) =>
              setFfmpegOutputArgs({
                ...ffmpegOutputArgs,
                format: e.target.value as keyof typeof mimeTypes
              })
            }>
            <option value='mp4'>MP4</option>
            <option value='mpeg'>MPEG</option>
            <option value='flv'>FLV</option>
            <option value='wmv'>WMV</option>
            <option value='avi'>AVI</option>
            <option value='webm'>WebM</option>
            <option value='mov'>MOV</option>
            <option value='gif'>GIF</option>
            <option value='jpeg'>JPEG</option>
            <option value='png'>PNG</option>
          </select>
        </div>
      </form>
      <p className='text-center text-xs font-bold text-textSecondary font-mono mt-4 border border-dotted border-textSecondary rounded'>
        ffmpeg -i {inputFileName}
        {ffmpegOutputArgs.resolution && ' -vf'} {ffmpegOutputArgs.resolution}
        {` vce_${inputFileName?.split('.')[0]}`}.{outputFileFormat}
      </p>

      <button onClick={doTranscode} className='btn bg-bgPrimary self-center mt-4'>
        &gt; Start
      </button>
      <small className='text-center text-xs text-textSecondary mt-4'>{message}</small>
    </div>
  );
};
