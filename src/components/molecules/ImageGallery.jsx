import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { motion, AnimatePresence } from "framer-motion"

const ImageGallery = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState({})

  const nextImage = () => {
    setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1)
  }

  const prevImage = () => {
    setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1)
  }

  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 aspect-property">
        {/* Main Image */}
        <div className="col-span-4 md:col-span-3 relative rounded-xl overflow-hidden cursor-pointer group" onClick={openModal}>
          {!imageLoaded[currentImage] && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 image-placeholder"></div>
          )}
          <img
            src={images[currentImage]}
            alt={`${title} - Image ${currentImage + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 ${
              imageLoaded[currentImage] ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: "all 0.3s ease" }}
            onLoad={() => handleImageLoad(currentImage)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {currentImage + 1} / {images.length}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ApperIcon name="Expand" className="w-4 h-4 inline mr-1" />
            View Full Size
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="hidden md:flex flex-col gap-4">
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index + 1}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => {
                setCurrentImage(index + 1)
                openModal()
              }}
            >
              {!imageLoaded[index + 1] && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 image-placeholder"></div>
              )}
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 2}`}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                  imageLoaded[index + 1] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index + 1)}
              />
              {index === 2 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                  +{images.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          onClick={prevImage}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          <span>Previous</span>
        </Button>
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImage ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={nextImage}
          className="flex items-center space-x-2"
        >
          <span>Next</span>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
        </Button>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.img
                key={currentImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={images[currentImage]}
                alt={`${title} - Image ${currentImage + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Close Button */}
              <Button
                variant="ghost"
                onClick={closeModal}
                className="absolute top-6 right-6 text-white hover:bg-white/20 w-12 h-12 rounded-full"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </Button>

              {/* Navigation */}
              <Button
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
              >
                <ApperIcon name="ChevronLeft" className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full"
              >
                <ApperIcon name="ChevronRight" className="w-6 h-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                {currentImage + 1} of {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery