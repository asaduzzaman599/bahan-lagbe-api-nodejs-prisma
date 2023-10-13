import catchAsync from "../../../shared/catch-async"
import pick from "../../../shared/pick"
import responseData from "../../../shared/response"
import { VehicleService } from "./vehicles.service"

const insertVehicle = catchAsync(async (req, res) => {
  
  const vehicle = req.body;

  const result = await VehicleService.insertVehicle(vehicle);
  
  return responseData({ message: "Vehicle inserted  successfully", result }, res);
});

const updateVehicle = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await VehicleService.updateVehicle(id, data);

  return responseData({ message: "Vehicle updated  successfully", result }, res);
});

const deleteVehicle = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await VehicleService.deleteVehicle(id);

  return responseData({ message: "Vehicle deleted  successfully", result }, res);
});

const findOneVehicle = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await VehicleService.findOneVehicle(id);
  return responseData({ message: "Vehicle fetched successfully", result }, res);
});

const findVehicles = catchAsync(async (req, res) => {
  const query = req.query
  const paginationOptions = pick(query,['page', 'size','sortBy','sortOrder'])
  const filterOptions = pick(query,['search', 'minPrice','maxPrice','category'])
  const result = await VehicleService.findVehicles(filterOptions,paginationOptions);
  return responseData({ message: "Vehicles retrieved successfully",result:  { result: result.data, meta: result.meta}}, res);
});

const findVehicleByCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId
  const query = req.query
  const paginationOptions = pick(query,['page', 'size','sortBy','sortOrder'])
  const filterOptions = pick(query,['search', 'minPrice','maxPrice','category'])
  filterOptions.categoryId = categoryId
  const result = await VehicleService.findVehicles(filterOptions,paginationOptions);
  return responseData({ message: "Vehicles with associated category data fetched successfully", result:  { result: result.data, meta: result.meta}}, res);
});

export const VehicleController = {
  insertVehicle,
  updateVehicle,
  deleteVehicle,
  findOneVehicle,
  findVehicles,
  findVehicleByCategory
};
