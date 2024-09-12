import React from 'react';
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "./RequiredSymbol";

const SeoAttributes = ({handler}) => {
  return (
    <section className="w-full md:px-8 px-4 py-4 space-y-6">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="slug"
                  className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
                >
                  URL Slug
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="slug"
                  placeholder="URL Slug"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
                >
                  SEO Title
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="title"
                  placeholder="SEO Title"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="seo_desc"
                  className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
                >
                  Description
                  <RequiredSymbol />
                </label>
                <Textarea
                  type="text"
                  minRows={4}
                  id="seo_desc"
                  variant="bordered"
                  placeholder="For daily Gemstone goodness and exclusive deals. Sparkle awaits join us today!"
                  size="lg"
                  radius="sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="tags"
                  className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
                >
                  SEO Tags
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="tags"
                  placeholder="SEO Tags"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                />
              </div>
            </div>
          </div>

          {/* Save and cancel buttons */}
          <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
            <Button
              onClick={handler}
              variant="bordered"
              className="font-semibold"
            >
              Back to list
            </Button>
            <Button
              color="primary"
              className="font-semibold text-white"
              startContent={<FiSave size={20} />}
            >
              Save New Page
            </Button>
          </div>
        </section>
  )
}

export default SeoAttributes