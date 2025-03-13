'use client';

import { z } from 'zod';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const FileSchema = z
  .any()
  .refine((files) => files !== undefined)
  .refine((file) => !!file, 'Image is required.')
  .refine((file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false), '.jpg, .jpeg, .png files are accepted.');

export const FileListSchema = z
  .any()
  .refine((files) => files !== undefined)
  .refine((files) => !!files, 'Image is required.')
  .transform((files) =>
    new Array(files.length) //
      .fill(1)
      .map((_, index) => files.item(index)),
  )
  .refine((files) => files.every((file: File | null) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false)), '.jpg, .jpeg, .png files are accepted.');
