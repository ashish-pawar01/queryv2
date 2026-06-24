import { useMutation } from "@tanstack/react-query";

import { previewQuery } from "../services/queryPreviewService";

export const useQueryPreview = () =>
  useMutation({
    mutationFn: previewQuery,
  });
