import React from 'react'
import Modal from '../modal'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button';
import EditVideoForm from '@/components/forms/edit-video';

type Props = { title: string; description: string; videoId: string }

const EditVideo = ({ description, title, videoId }: Props) => {
  return (
    <Modal
      title="Edit video details"
      description="You can update your video details here!"
      trigger={
        <Button variant={'ghost'} className='cursor-pointer'>
          <Edit className="text-[#6c6c6c]" />
        </Button>
      }
    >
      <EditVideoForm description={description} title={title} videoId={videoId} />
    </Modal>
  )
}

export default EditVideo
