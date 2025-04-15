import { useState } from 'react'
import { IconLoader } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface MultiImageUploadProps {
  onFilesChange: (files: File[]) => void
  defaultFiles?: File[]
  disabled?: boolean
  className?: string
  isControlled?: boolean
  maxWidth?: number
  maxHeight?: number
}

export function MultiImageUpload({
  onFilesChange,
  defaultFiles,
  disabled,
  className = '',
  isControlled = false,
  maxWidth = 1000,
  maxHeight = 1000,
}: MultiImageUploadProps) {
  const [internalFiles, setInternalFiles] = useState<File[]>(defaultFiles ?? [])
  const [isLoading, setIsLoading] = useState(false)

  const files = isControlled ? (defaultFiles ?? []) : internalFiles

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)

      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (!blob) return
          const resizedFile = new File([blob], file.name, { type: file.type })
          resolve(resizedFile)
        }, file.type)
      }
    })
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const selectedFiles = Array.from(e.target.files ?? [])

    // Resize all images
    try {
      const resizedFiles = await Promise.all(selectedFiles.map(resizeImage))

      if (!isControlled) {
        setInternalFiles(resizedFiles)
      }
      onFilesChange?.(resizedFiles)
    } catch (error) {
      console.error('Error resizing images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPreviewUrl = (file: File) => {
    return URL.createObjectURL(file)
  }

  return (
    <div className='space-y-4'>
      <FormControl>
        <Input
          type='file'
          accept='image/*'
          multiple
          disabled={disabled}
          className={cn(className)}
          onChange={handleChange}
        />
      </FormControl>

      {isLoading ? (
        <div className='flex items-center justify-center gap-2'>
          <IconLoader className='h-5 w-5 animate-spin' />
          {'  '}
          Loading...
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-2'>
          {files.map((file, index) => (
            <div
              key={index}
              className='relative h-32 w-full overflow-hidden rounded-md border'
            >
              <img
                src={getPreviewUrl(file)}
                alt={`Uploaded preview ${index}`}
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
