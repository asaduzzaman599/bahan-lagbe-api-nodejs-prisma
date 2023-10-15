import catchAsync from "../../../shared/catch-async"
import responseData from "../../../shared/response";
import { ContentService } from "./contents.service";

const insertContent = catchAsync(async (req, res) => {
  const content = req.body;

  const result = await ContentService.insertContent(content);
  
  return responseData({ message: "Content inserted  successfully", result }, res);
});

const updateContent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ContentService.updateContent(id, data);

  return responseData({ message: "Content updated  successfully", result }, res);
});

const deleteContent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ContentService.deleteContent(id);

  return responseData({ message: "Content deleted  successfully", result }, res);
});

const findOneContent = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ContentService.findOneContent(id);
  return responseData({ message: "Content fetched successfully", result }, res);
});

const findContents = catchAsync(async (req, res) => {
  const result = await ContentService.findContents();
  return responseData({ message: "Contents retrieved successfully", result }, res);
});

export const ContentController = {
  insertContent,
  updateContent,
  deleteContent,
  findOneContent,
  findContents,
};
