import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { baseURL } from "../../config";


export const useBannersApi = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("stream-token");
  const getBanners = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/api/admin/home-page/homePageBanner`,{
            headers: {
            //   "x-api-key": "665544332211",
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
            },
          }
      );
      setBanners(res.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch Banners");
    } finally {
      setLoading(false);
    }
  };

  const addBanner = async (BannerData) => {
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    try {
      const payload = {
        ...BannerData,
      };

      const res = await axios.post(
        `${baseURL}/api/admin/home-page/homePageBanner`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      toast.success(res.data?.message || "Banner added successfully");
      getBanners(); // Refresh Banner list
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Banner");
    }
  };
  const deleteBanner = async (BannerId) => {
    const token = Cookies.get("stream-token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    try {
      await axios.delete(
        `${baseURL}/api/admin/home-page/homePageBanner/${BannerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Banner deleted successfully");
      setBanners((prev) => prev.filter((e) => e._id !== BannerId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete Banner");
    }
  };
  useEffect(() => {
    getBanners();
  }, []);

  return { banners, loading, getBanners, addBanner, deleteBanner };
};
