/**
 * Converts a hyphen-separated string to title case.
 * Each word in the string is capitalized, and the hyphens are replaced with spaces.
 *
 * @param input - The hyphen-separated string to convert.
 * @returns The converted string in title case.
 */

import React from 'react';
import { PaginationParams, PaginationResult } from '../type/pagination.type';

export function convertToTitleCase(input: string): string {
  // Split the input string into an array of words using the hyphen as the separator
  const words = input.split('-');

  // Capitalize the first letter of each word and concatenate the rest of the word
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });

  // Join the capitalized words together with a space
  return capitalizedWords.join(' ');
}

/**
 * Formats a price into a US dollar currency string representation.
 *
 * @param price - The price value to format.
 * @param options - (Optional) Additional formatting options for the Intl.NumberFormat.
 * @returns The formatted price as a US dollar currency string.
 */
export const currencyFormat = (price: number, options?: Intl.NumberFormatOptions): string => {
  // Create a new Intl.NumberFormat instance with locale 'en-US' (English, United States) and currency 'USD' (US dollar)
  // Configure additional options such as minimumFractionDigits and maximumFractionDigits
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  });

  // Format the price value using the configured number formatter
  return numberFormatter.format(price);
};

/**
 * Converts pagination parameters (page and page_size) to limit and skip values.
 * The limit value represents the number of records to retrieve per page,
 * and the skip value represents the number of records to skip before starting the current page.
 *
 * @param pagination - An object containing pagination parameters (page and page_size).
 * @returns An object with limit and skip values for pagination.
 */
export function convertToLimitAndSkip(pagination: PaginationParams): PaginationResult {
  // Calculate the limit value based on the page_size parameter
  const limit = pagination.page_size;

  // Calculate the skip value by subtracting 1 from the page parameter and multiplying it by the page_size
  const skip = (pagination.page - 1) * pagination.page_size;

  // Return an object with limit and skip values
  return {
    limit,
    skip,
  };
}

export const getChildrenOnDisplayName = (children: any, displayName: string) =>
  React.Children.map(children, (child) => (child.type.displayName === displayName ? child : null));
