import React from 'react'

import { ButtonAppPreview } from './ButtonAppPreview'
import { ButtonImageDelete } from './ButtonImageDelete'
import { ButtonImageEdit, IUploadImageValues } from './ButtonImageEdit'
import { OnImageUploadArgs } from './ButtonImageEdit/ModalImageEdit/ModalImageEdit'
import { ImagePreview } from './ImagePreview'
import styles from './ImageUploader.module.scss'
import { UploaderModeEnum } from './types'

export interface ImageUploaderProps {
  onImageUpload: (values: OnImageUploadArgs) => Promise<void>
  onImageDelete: () => Promise<void>
  initialValues?: IUploadImageValues
  mode: UploaderModeEnum
}

const ImageUploader = ({
  onImageUpload,
  onImageDelete,
  initialValues = {},
  mode,
}: ImageUploaderProps) => {
  const { imageUrl, originalImageUrl, credit, cropParams } = initialValues

  return (
    <div className={styles['image-uploader-image-container']}>
      {imageUrl && originalImageUrl ? (
        <>
          <ImagePreview
            mode={mode}
            imageUrl={imageUrl}
            alt="Prévisualisation de l’image"
          />
          <div className={styles['image-uploader-actions-container']}>
            <div className={styles['actions-wrapper']}>
              <ButtonImageEdit
                mode={mode}
                initialValues={{
                  originalImageUrl,
                  imageUrl,
                  credit,
                  cropParams,
                }}
                onImageUpload={onImageUpload}
              />
              {mode != UploaderModeEnum.OFFER_COLLECTIVE && (
                <ButtonAppPreview imageUrl={imageUrl} mode={mode} />
              )}
              <ButtonImageDelete onImageDelete={onImageDelete} />
            </div>
          </div>
        </>
      ) : (
        <ButtonImageEdit mode={mode} onImageUpload={onImageUpload} />
      )}
    </div>
  )
}

export default ImageUploader
