/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { StoryDto } from "./story-dto";

export interface NewestStoriesResponseDto {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItemsCount: number;
    stories: StoryDto[];
}
