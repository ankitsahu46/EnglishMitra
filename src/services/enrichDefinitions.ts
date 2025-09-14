"use server";

import {
  EnrichDefinitionsResult,
  StandardExpData,
  ExpressionDefinitions,
} from "@/types";
import { fetchImages, generateExamplesBulk, generateTagsBulk } from "@/utils";

export async function enrichDefinitions(
  content: Readonly<StandardExpData>
): Promise<EnrichDefinitionsResult> {
  let foundNewData = false;

  // Clone to avoid mutating Readonly input
  const definitions = content.definitions.map((d) => ({ ...d }));

  try {
    await enrichExamples(definitions, content.commonData.text);
    await enrichTags(definitions);
    await enrichImages(definitions);

    foundNewData = definitions.some(
      (def, idx) =>
        (!content.definitions[idx].example && def.example) ||
        (!content.definitions[idx].tags?.length && def.tags?.length) ||
        (!content.definitions[idx].images?.length && def.images?.length)
    );
  } catch (err) {
    console.error("EnrichDefinitions failed:", err);
  }

  return {
    enriched: { ...content, definitions },
    foundNewData,
  };
}
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
export async function enrichExamples(
  defs: ExpressionDefinitions[],
  contextText: string
) {
  const missingIndices: number[] = [];
  const missingDefs: string[] = [];

  defs.forEach((def, idx) => {
    if (!def.example?.trim()) {
      missingIndices.push(idx);
      missingDefs.push(def.definition);
    }
  });

  if (!missingDefs.length) return;

  const examples = await generateExamplesBulk(missingDefs, contextText);
  missingIndices.forEach((idx, i) => {
    defs[idx].example = examples[i] || "";
  });
}
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
const tagsCache = new Map<string, string[]>();

export async function enrichTags(defs: ExpressionDefinitions[]) {
  const examples = defs.map((d) => d.example);
  const uncached: string[] = [];
  const uncachedIndices: number[] = [];
  const results: string[][] = [];

  examples.forEach((ex, idx) => {
    if (tagsCache.has(ex)) {
      results[idx] = tagsCache.get(ex)!;
    } else {
      uncached.push(ex);
      uncachedIndices.push(idx);
    }
  });

  if (uncached.length) {
    const newTags = await generateTagsBulk(uncached);
    uncachedIndices.forEach((idx, i) => {
      results[idx] = newTags[i] || [];
      tagsCache.set(examples[idx], results[idx]);
    });
  }

  defs.forEach((def, idx) => {
    if (!def.tags?.length) def.tags = results[idx] || [];
  });
}
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
//.
const imagesCache = new Map<string, string[]>();

export async function enrichImages(defs: ExpressionDefinitions[]) {
  const promises = defs.map(async (def) => {
    const key = `${def.example}::${def.tags.join(",")}`;
    if (imagesCache.has(key)) {
      return { images: imagesCache.get(key)! };
    }
    const result = await fetchImages(def.example, def.tags);
    imagesCache.set(key, result.images || []);
    return result;
  });

  const results = await Promise.allSettled(promises);

  results.forEach((res, idx) => {
    if (
      res.status === "fulfilled" &&
      res.value.images?.length &&
      !defs[idx].images?.length
    ) {
      defs[idx].images = res.value.images;
    }
  });
}
