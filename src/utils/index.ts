import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { convertToCamelCase } from "./convertToCamelCase";
import { convertToEntrySchemaFormat } from "./convertToEntrySchemaFormat";
import { convertToWordSchemaFormat } from "./convertToWordData";
import { detectExpressionType } from "./detectExpressionType";
import { detectExpressionTypeFromApi } from "./detectExpressionTypeFromApi";
import { enrichPhrasalVerbDataGpt } from "./enrichPhrasalVerbDataGpt";
import { extractDefinitionAndExample } from "./extractDefinitionAndExample";
import { extractDefinitions } from "./extractEntryDefinitions";
import { fetchData } from "./fetchData";
import { fetchEntryData } from "./fetchEntryData";
import { fetchWordData } from "./fetchWordData";
import { formatApiTextToHtml } from "./formateAPITextToHTML";
import { generateAIExample } from "./generateAIExample";
import { generateAudio } from "./generateAudio";
import { generateFromAI } from "./generateFromAI";
import { getEntryContent } from "./getEntryContent";
import { getEntryOfTheDay } from "./getEntryOfTheDay";
import { getWordContent } from "./getWordContent";
import { validateDayParam } from "./validateDayParams";



export { validateDayParam, convertToWordSchemaFormat, generateAudio, convertToCamelCase, enrichPhrasalVerbDataGpt, convertToEntrySchemaFormat, getWordContent, getEntryContent,fetchData, extractDefinitionAndExample, extractDefinitions,generateAIExample,getEntryOfTheDay, formatApiTextToHtml, fetchEntryData, detectExpressionType, detectExpressionTypeFromApi, fetchWordData, generateFromAI, capitalizeFirstLetter};